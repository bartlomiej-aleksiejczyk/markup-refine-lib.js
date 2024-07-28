<svelte:options customElement="dynamic-topbar" />

<script>
  //TODO: Extract smaller components ?separate render and logic?
  //TODO: Rename component and input
  //TODO: Gracefull handling of wrong data
  //TODO: Animation flickering and lagging, Refine wrapper transition
  //TODO: POST logout
  //TODO: Handle loading/processing js/ empty state gracefully/skeleton/loaders/sth
  //TODO: Add translation
  //TODO: Handle no item fixed or custom items conditions

  import { afterUpdate, onMount } from "svelte";
  import { writable } from "svelte/store";
  import { slide } from "svelte/transition";
  import { User, Menu } from "lucide-svelte";
  import TopbarDropdown from "./TopbarDropdown/TopbarDropdown.svelte";
  import MobileMenu from "./MobileMenu/MobileMenu.svelte";
  import DynamicIcon from "../DynamicIcon/DynamicIcon.svelte";
  import Topbar from "./Topbar/Topbar.svelte";
  import { validateTopbarSchema } from "./inputProcessingFunctions/validateTopbarSchema";
  import { getFixedItems } from "./inputProcessingFunctions/getFixedItems";

  export let data = {};

  let topbarItems = writable([]);
  let fixedTopbarItems = writable({});
  let topbarSettings = writable({});

  let screenWidth = writable(window.innerWidth);
  let isCustomMenuExpanded = writable(false);
  let isFixedMenuExpanded = writable(false);
  let isRegularScreenModeEnabled = writable(true);
  let isHeadlineEnabled = writable(false);

  const MOBILE_MODE_BREAKPOINT_PIXELS = 600;

  $: if ($screenWidth >= MOBILE_MODE_BREAKPOINT_PIXELS) {
    isCustomMenuExpanded.set(false);
    isFixedMenuExpanded.set(false);
    isRegularScreenModeEnabled.set(true);
  } else {
    isRegularScreenModeEnabled.set(false);
  }

  function setData(value) {
    if (!value || Object.keys(value).length === 0) return;
    try {
      const jsonData = JSON.parse(value);
      if (!validateTopbarSchema(jsonData)) {
        console.error("Invalid format for top bar data input");
        return;
      }
      topbarItems.set(jsonData.content);
      fixedTopbarItems.set(getFixedItems(jsonData));
      topbarSettings.set(jsonData.topbarSettings);

      isHeadlineEnabled.set(
        jsonData?.topbarSettings?.title || jsonData?.topbarSettings?.logoUri
      );
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
    setData(data);
  });

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
  <Topbar
    {topbarItems}
    {fixedTopbarItems}
    {isRegularScreenModeEnabled}
    {toggleCustomMenu}
    {toggleFixedMenu}
    {topbarSettings}
    {isHeadlineEnabled}
  />
  <MobileMenu
    {isCustomMenuExpanded}
    {isFixedMenuExpanded}
    {topbarItems}
    {fixedTopbarItems}
  />
{/if}
