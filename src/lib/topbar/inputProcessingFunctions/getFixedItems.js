export const getFixedItems = (data) => {
  if (data.fixedContent?.disableSettings) return {};
  let fixedItems = {
    defaultName: "User",
    type: "container",
    iconName: "user",
    id: "settings",
    objects: [
      {
        link: "https://mysite.invalid/privacy/",
        defaultName: "Preferences",
        id: "userPreferences",
        iconName: "userCog",
        type: "link",
      },
      {
        link: "https://mysite.invalid/privacy/",
        defaultName: "Settings",
        id: "userSettings",
        iconName: "settings2",
        type: "link",
      },
      {
        link: "https://mysite.invalid/security/",
        defaultName: "Logout",
        id: "logout",
        iconName: "logOut",
        type: "link",
      },
    ],
  };

  const logoutItemIndex = fixedItems.objects.findIndex(
    (item) => item.id === "logout"
  );
  const preferenceItemIndex = fixedItems.objects.findIndex(
    (item) => item.id === "userPreferences"
  );
  const settingsItemIndex = fixedItems.objects.findIndex(
    (item) => item.id === "userSettings"
  );

  if (data.fixedContent.logoutUrl) {
    fixedItems.objects[logoutItemIndex].link = data.fixedContent.logoutUrl;
  } else {
    fixedItems.objects.splice(logoutItemIndex, 1);
  }

  if (data.fixedContent.userPreferencesUrl) {
    fixedItems.objects[preferenceItemIndex].link =
      data.fixedContent.userPreferencesUrl;
  } else {
    fixedItems.objects.splice(preferenceItemIndex, 1);
  }

  if (data.fixedContent.userSettingsUrl) {
    fixedItems.objects[settingsItemIndex].link =
      data.fixedContent.userSettingsUrl;
  } else {
    fixedItems.objects.splice(settingsItemIndex, 1);
  }

  return fixedItems;
};
