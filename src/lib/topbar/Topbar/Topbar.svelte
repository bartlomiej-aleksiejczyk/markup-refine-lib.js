<script>
  export let toggleFixedMenu;
  export let toggleCustomMenu;
  export let topbarItems;
  export let fixedTopbarItems;
  export let isRegularScreenModeEnabled;

  import DynamicIcon from "../../DynamicIcon/DynamicIcon.svelte";
  import TopbarLink from "../TopbarLink/TopbarLink.svelte";
  import TopbarDropdown from "../TopbarDropdown/TopbarDropdown.svelte";
</script>

<div class="topbar">
  {#if $isRegularScreenModeEnabled}
    <div class="topbar__custom-items">
      {#each $topbarItems as item}
        {#if item.type === "link"}
          <TopbarLink {item} />
        {:else if item.type === "container"}
          <TopbarDropdown {item} />
        {/if}
      {/each}
    </div>
    <div class="topbar__fixed-items">
      <TopbarDropdown item={$fixedTopbarItems} isLeftOriented />
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
