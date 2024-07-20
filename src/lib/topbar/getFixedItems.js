export const getFixedItems = (data) => {
  console.log(data);
  if (data.fixedContent?.disableSettings) return {};
  let fixedItems = {
    defaultName: "Settings",
    type: "container",
    iconLink:
      "https://img.icons8.com/?size=100&id=6i0wNATb63Qv&format=png&color=000000",
    id: "settings",
    objects: [
      {
        link: "https://mysite.invalid/security/",
        defaultName: "Logout",
        id: "logout",
        type: "link",
      },
      {
        link: "https://mysite.invalid/privacy/",
        defaultName: "User Preferences",
        id: "userPreferences",
        type: "link",
      },
      {
        link: "https://mysite.invalid/privacy/",
        defaultName: "User Settings",
        id: "userSettings",
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
