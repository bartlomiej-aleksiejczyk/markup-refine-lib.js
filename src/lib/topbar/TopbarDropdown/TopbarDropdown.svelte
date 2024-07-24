<script>
  export let item;
  export let isLeftOriented = false;
  import DynamicIcon from "../../DynamicIcon/DynamicIcon.svelte";
</script>

<div class="topbar__dropdown">
  <div class="topbar-button">
    {#if item.iconName}
      <div class="topbar__icon">
        <DynamicIcon iconName={item.iconName + "--reversed-primary"} />
      </div>
    {/if}
    <span class="dropbtn">{item.defaultName}</span>
  </div>
  <div
    class={isLeftOriented
      ? "topbar__dropdown-content topbar__dropdown-content--right"
      : "topbar__dropdown-content"}
  >
    {#each item.objects as subItem}
      <a href={subItem.link} class="topbar__dropdown-link">
        <div class="topbar__dropdown-button">
          {#if subItem.iconName}
            <div class="topbar__icon">
              <DynamicIcon iconName={subItem.iconName + "--primary"} />
            </div>
          {/if}
          <span>
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
