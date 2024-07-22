<script>
  import { onMount } from "svelte";
  import {
    Home,
    User,
    Settings,
    Settings2,
    Menu,
    X,
    Shield,
    LogOut,
    UserCog,
    Database,
  } from "lucide-svelte";
  //TODO: Gracefull handling of wrong data

  export let iconName = "home";
  export let clazz = "";

  let iconComponent;
  let color;

  const iconLookup = {
    home: Home,
    menu: Menu,
    user: User,
    settings: Settings,
    settings2: Settings2,
    x: X,
    shield: Shield,
    logOut: LogOut,
    userCog: UserCog,
    database: Database,
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

<svelte:component this={iconComponent} role="img" {color} class={clazz} />

<style>
  :global(svg) {
    width: 24px;
    height: 24px;
  }
</style>
