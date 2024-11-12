<script>
  export let toggleFixedMenu;
  export let toggleCustomMenu;
  export let topbarItems;
  export let topbarSettings;
  export let fixedTopbarItems;
  export let isRegularScreenModeEnabled;
  export let topbarElement;
  export let isHeadlineEnabled;

  import DynamicIcon from "../../DynamicIcon/DynamicIcon.svelte";
  import TopbarLink from "../TopbarLink/TopbarLink.svelte";
  import TopbarDropdown from "../TopbarDropdown/TopbarDropdown.svelte";
</script>

<div class="topbar {$isHeadlineEnabled ? '' : 'topbar--centered'}">
  {#if $isRegularScreenModeEnabled}
    {#if $isHeadlineEnabled}
      <a href={$topbarSettings.homeUri}>
        <div class="topbar__header">
          {#if $topbarSettings.logoUri}
            <img
              class="topbar__header-logo"
              src={$topbarSettings.logoUri}
              alt="Application logo"
            />
          {/if}
          {#if $topbarSettings.title}
            <h1 class="topbar__header-text">{$topbarSettings.title}</h1>
          {/if}
        </div>
      </a>
    {/if}

    <div bind:this={topbarElement} class="topbar__navigation-items">
      {#each $topbarItems as item, index (item)}
        {#if item.type === "link"}
          <TopbarLink {item} />
        {:else if item.type === "container"}
          <TopbarDropdown
            {item}
            isLeftOriented={index === $topbarItems.length - 1 &&
            $fixedTopbarItems.objects.length === 0 &&
            $topbarItems.length > 1
              ? true
              : false}
          />
        {/if}
      {/each}
      {#if $fixedTopbarItems.objects.length > 0}
        <TopbarDropdown item={$fixedTopbarItems} isLeftOriented />
      {/if}
    </div>
  {:else}
    <button
      class="hamburger"
      data-testid="customItemsButtonMobile"
      aria-label="Close"
      on:click={toggleCustomMenu}
    >
      <div class="topbar__icon">
        <DynamicIcon iconName="menu--reversed-primary" />
      </div>
    </button>
    <a href={$isHeadlineEnabled}>
      <div class="topbar__header topbar__header--mobile">
        {#if $topbarSettings.logoUri}
          <img
            class="topbar__header-logo topbar__header-logo--mobile"
            src={$topbarSettings.logoUri}
            alt="Application logo"
          />
        {/if}
      </div>
    </a>
    <button
      class="hamburger"
      data-testid="fixedItemsButtonMobile"
      on:click={toggleFixedMenu}
    >
      <div class="topbar__icon--mobile">
        <DynamicIcon iconName="user--reversed-primary" />
      </div>
    </button>
  {/if}
</div>

<style>
  @import "./topbar.css";
  @import "../topbar-common.css";
</style>
