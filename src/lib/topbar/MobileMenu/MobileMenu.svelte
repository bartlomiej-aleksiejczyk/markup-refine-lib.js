<!-- MobileMenu.svelte -->
<script>
  export let isCustomMenuExpanded;
  export let isFixedMenuExpanded;
  export let topbarItems;
  export let fixedTopbarItems;
  import { slide } from "svelte/transition";
  import DynamicIcon from "../../DynamicIcon/DynamicIcon.svelte";
</script>

<div class="hamburger-menu-wrapper">
  {#if $isCustomMenuExpanded}
    <div transition:slide class="hamburger-menu-container">
      {#each $topbarItems as item}
        {#if item.type === "link"}
          <a href={item.link} class="topbar__link--mobile">
            {#if item.iconName}
              <div class="topbar__icon--mobile">
                <DynamicIcon iconName={item.iconName + "--reversed-primary"} />
              </div>
            {/if}
            {item.defaultName || ""}
          </a>
        {:else if item.type === "container"}
          <div class="topbar-section--mobile">
            <hr class="topbar-separator--mobile" />
            {#if item.iconName}
              <div class="topbar__icon--mobile">
                <DynamicIcon iconName={item.iconName + "--reversed-primary"} />
              </div>
            {/if}
            <span class="dropbtn--mobile">{item.defaultName}</span>
            <div class="topbar__dropdown-content--mobile">
              {#each item.objects as subItem}
                <a href={subItem.link} class="topbar-section-link--mobile">
                  {#if subItem.iconName}
                    <div class="topbar__icon--mobile">
                      <DynamicIcon iconName={subItem.iconName + "--primary"} />
                    </div>
                  {/if}
                  {subItem.defaultName || ""}
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
          {#if $fixedTopbarItems.iconName}
            <div class="topbar__icon--mobile">
              <DynamicIcon
                iconName={$fixedTopbarItems.iconName + "--reversed-primary"}
              />
            </div>
          {/if}
          <span class="dropbtn--mobile">{$fixedTopbarItems.defaultName}</span>
        </div>

        <div class="topbar__dropdown-content--mobile">
          {#each $fixedTopbarItems.objects as subItem}
            <a href={subItem.link} class="topbar-section-link--mobile">
              {#if subItem.iconName}
                <div class="topbar__icon--mobile">
                  <DynamicIcon iconName={subItem.iconName + "--primary"} />
                </div>
              {/if}
              {subItem.defaultName || ""}
            </a>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  @import "../topbar-common.css";
  @import "./mobile-menu.css";
</style>
