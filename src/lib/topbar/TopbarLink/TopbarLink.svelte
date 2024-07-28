<script>
  export let item;
  import DynamicIcon from "../../DynamicIcon/DynamicIcon.svelte";
</script>

<a href={item.link} class="topbar__link">
  <div class="topbar-button">
    {#if item.iconName}
      <div class="topbar__icon">
        <DynamicIcon iconName={item.iconName + "--reversed-primary"} />
      </div>
    {/if}
    <span class="topbar-text topbar-text--large">
      {item.defaultName || ""}
    </span>
  </div>
</a>

<style>
  @import "../topbar-common.css";
  @import "./topbar-link.css";
</style>
