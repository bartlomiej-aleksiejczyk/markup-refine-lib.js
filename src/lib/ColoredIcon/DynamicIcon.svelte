<script>
  import { onMount } from "svelte";
  import { Home, User, Settings } from "lucide-svelte";

  export let iconName = "home";

  let iconComponent;
  let color;

  const iconLookup = {
    home: Home,
    user: User,
    settings: Settings,
  };

  const parseIconName = (name) => {
    const [icon, modifier] = name.split("--");
    return { icon, modifier };
  };

  const updateIcon = () => {
    const { icon, modifier } = parseIconName(iconName);
    iconComponent = iconLookup[icon] || Home;

    if (modifier === "primary") {
      color = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-text-primary")
        .trim();
    } else if (modifier === "reversed-primary") {
      color = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-text-on-primary")
        .trim();
    } else {
      color = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-text-primary")
        .trim();
    }
  };

  $: updateIcon();

  onMount(() => {
    updateIcon();
  });
</script>

<svelte:component this={iconComponent} stroke={color} />

<style>
  :global(svg) {
    width: 24px;
    height: 24px;
  }
</style>
