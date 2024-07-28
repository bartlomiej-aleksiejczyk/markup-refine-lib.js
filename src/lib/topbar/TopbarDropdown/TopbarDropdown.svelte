<script>
  import { onMount } from "svelte";
  export let item;
  export let isLeftOriented = false;
  import DynamicIcon from "../../DynamicIcon/DynamicIcon.svelte";

  let dropdownContent;

  onMount(() => {
    const topbarRef = document
      .querySelector("dynamic-topbar")
      .shadowRoot.querySelector(".topbar");

    const updatePosition = () => {
      const buttonRect =
        dropdownContent.previousElementSibling.getBoundingClientRect();
      const additionalDropdownSpace = 10;
      dropdownContent.style.top = `${buttonRect.bottom + additionalDropdownSpace}px`;

      let availableSpace;
      let viewPortEdgeDistance;
      if (isLeftOriented) {
        availableSpace = buttonRect.left - additionalDropdownSpace;
        dropdownContent.style.right = `${window.innerWidth - buttonRect.right}px`;
      } else {
        availableSpace =
          window.innerWidth - buttonRect.left - additionalDropdownSpace;

        dropdownContent.style.left = `${buttonRect.left - window.scrollX}px`;
      }
      dropdownContent.style.maxWidth = `${availableSpace}px`;
    };

    window.addEventListener("resize", updatePosition);
    topbarRef.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => {
      window.removeEventListener("resize", updatePosition);
      topbarRef.removeEventListener("scroll", updatePosition);
    };
  });
</script>

<div class="topbar__dropdown">
  <div class="topbar-button">
    {#if item.iconName}
      <DynamicIcon iconName={item.iconName + "--reversed-primary"} />
    {/if}
    <span class="dropbtn topbar-text topbar-text--large"
      >{item.defaultName}</span
    >
  </div>
  <div
    class={isLeftOriented
      ? "topbar__dropdown-content topbar__dropdown-content--right"
      : "topbar__dropdown-content"}
    bind:this={dropdownContent}
  >
    {#each item.objects as subItem}
      <a href={subItem.link} class="topbar__dropdown-link">
        <div class="topbar__dropdown-button">
          {#if subItem.iconName}
            <DynamicIcon iconName={subItem.iconName + "--primary"} />
          {/if}
          <span class="topbar-text topbar-text--dropdown">
            {subItem.defaultName || ""}
          </span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  @import "./topbar-dropdown.css";
  @import "../topbar-common.css";
</style>
