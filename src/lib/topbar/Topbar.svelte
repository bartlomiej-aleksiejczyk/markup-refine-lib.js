<svelte:options customElement="dynamic-topbar" />

<script>
  import { afterUpdate, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { validateTopbarItems } from "./validateTopbarItems";
  import { slide } from "svelte/transition";
  import { getFixedItems } from "./getFixedItems";
  import { User, Menu } from "lucide-svelte";
  //TODO: Extract smaller components ?separate render and logic?
  //TODO: Add icon picker component
  //TODO: Refine wrapper transition
  //TODO: Rename component and input
  //TODO: Fix eslint
  import { customScale } from "./customScale";

  export let data;

  let topbarItems = writable([]);
  let fixedTopbarItems = writable({});
  let screenWidth = writable(window.innerWidth);
  let isCustomMenuExpanded = writable(false);
  let isFixedMenuExpanded = writable(false);

  const MOBILE_MODE_BREAKPOINT_PIXELS = 600;

  $: if ($screenWidth >= MOBILE_MODE_BREAKPOINT_PIXELS) {
    isCustomMenuExpanded.set(false);
    isFixedMenuExpanded.set(false);
  }

  function setData(value) {
    try {
      const jsonData = JSON.parse(value);
      if (!validateTopbarItems(jsonData)) {
        console.error("Invalid format for top bar data input");
        return;
      }
      topbarItems.set(jsonData.content);
      fixedTopbarItems.set(getFixedItems(jsonData));
    } catch (error) {
      console.error("Error setting data in Topbar:", error);
    }
  }

  function toggleCustomMenu() {
    isCustomMenuExpanded.update((value) => !value);
  }
  function toggleFixedMenu() {
    isFixedMenuExpanded.update((value) => !value);
  }

  afterUpdate(() => {
    if (!data) return;
    setData(data);
    if ($fixedTopbarItems?.objects) prefetchImages($fixedTopbarItems);
  });

  function prefetchImages(items) {
    items.objects.forEach((item) => {
      if (item.iconLink) {
        const img = new Image();
        img.src = item.iconLink;
      }
      if (item.type === "container" && item.objects) {
        item.objects.forEach((subItem) => {
          if (subItem.iconLink) {
            const img = new Image();
            img.src = subItem.iconLink;
          }
        });
      }
    });
  }

  onMount(() => {
    const handleResize = () => {
      screenWidth.set(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

{#if $fixedTopbarItems.objects && $topbarItems}
  <div class="topbar">
    {#if $screenWidth >= MOBILE_MODE_BREAKPOINT_PIXELS}
      <div class="topbar__custom-items">
        {#each $topbarItems as item}
          {#if item.type === "link"}
            <a href={item.link} class="topbar__link">
              {#if item.iconLink}
                <img
                  class="topbar__icon"
                  src={item.iconLink}
                  alt={item.defaultName}
                  loading="eager"
                />
              {/if}
              {item.defaultName || ""}
            </a>
          {:else if item.type === "container"}
            <div class="topbar__dropdown">
              <span class="dropbtn">{item.defaultName}</span>
              {#if item.iconLink}
                <img
                  class="topbar__icon"
                  src={item.iconLink}
                  alt={item.defaultName}
                  loading="eager"
                />
              {/if}
              <div class="topbar__dropdown-content">
                {#each item.objects as subItem}
                  <a href={subItem.link} class="topbar__dropdown-link">
                    {#if subItem.iconLink}
                      <img
                        class="topbar__icon--nested"
                        src={subItem.iconLink}
                        alt={subItem.defaultName}
                        loading="eager"
                      />
                    {/if}
                    {item.defaultName || ""}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
      <div class="topbar__fixed-items">
        <div class="topbar__dropdown">
          {#if $fixedTopbarItems.iconLink}
            <img
              class="topbar__icon"
              src={$fixedTopbarItems.iconLink}
              alt={$fixedTopbarItems.defaultName}
              loading="eager"
            />
          {/if}
          <span class="dropbtn">{$fixedTopbarItems.defaultName}</span>
          <div class="topbar__dropdown-content--right">
            {#each $fixedTopbarItems.objects as subItem}
              <a href={subItem.link} class="topbar__dropdown-link">
                {#if subItem.iconLink}
                  <img
                    class="topbar__icon"
                    src={subItem.iconLink}
                    alt={subItem.defaultName}
                    loading="eager"
                  />
                {/if}
                {subItem.defaultName}
              </a>
            {/each}
          </div>
        </div>
      </div>
    {:else}
      <button class="hamburger" on:click={toggleCustomMenu} role="button">
        <Menu class="topbar__icon--mobile" color="#fff" />
      </button>
      <button
        class="hamburger"
        on:click={toggleFixedMenu}
        role="button"
        tabindex="0"
      >
        <User class="topbar__icon--mobile" color="#fff" />
      </button>
    {/if}
  </div>
  <div class="hamburger-menu-wrapper">
    {#if $isCustomMenuExpanded}
      <div transition:slide class="hamburger-menu-container">
        {#each $topbarItems as item}
          {#if item.type === "link"}
            <a href={item.link} class="topbar__link--mobile">
              {#if item.iconLink}
                <img
                  class="topbar__icon--mobile"
                  src={item.iconLink}
                  alt={item.defaultName}
                />
              {/if}
              {item.defaultName || ""}
            </a>
          {:else if item.type === "container"}
            <div class="topbar-section--mobile">
              <hr class="topbar-separator--mobile" />
              {#if item.iconLink}
                <img
                  class="topbar__icon--mobile"
                  src={item.iconLink}
                  alt={item.defaultName}
                />
              {/if}
              <span class="dropbtn--mobile">{item.defaultName}</span>
              <div class="topbar__dropdown-content--mobile">
                {#each item.objects as subItem}
                  <a href={subItem.link} class="topbar-section-link--mobile">
                    {#if subItem.iconLink}
                      <img
                        class="topbar__icon--mobile"
                        src={subItem.iconLink}
                        alt={subItem.defaultName}
                      />
                    {/if}
                    {item.defaultName || ""}
                  </a>
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
    {#if $isFixedMenuExpanded}
      <div class="hamburger-menu-container" transition:slide>
        <div class="topbar-section--mobile">
          <div class="topbar-section-container--mobile">
            {#if $fixedTopbarItems.iconLink}
              <img
                class="topbar__icon--mobile"
                src={$fixedTopbarItems.iconLink}
                alt={$fixedTopbarItems.defaultName}
              />
            {/if}
            <span class="dropbtn--mobile">{$fixedTopbarItems.defaultName}</span>
          </div>

          <div class="topbar__dropdown-content--mobile">
            {#each $fixedTopbarItems.objects as subItem}
              <a href={subItem.link} class="topbar-section-link--mobile">
                {#if subItem.iconLink}
                  <img
                    class="topbar__icon--mobile"
                    src={subItem.iconLink}
                    alt={subItem.defaultName}
                  />
                {/if}
                {subItem.defaultName || ""}
              </a>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  @import "./topbar.css";
</style>
