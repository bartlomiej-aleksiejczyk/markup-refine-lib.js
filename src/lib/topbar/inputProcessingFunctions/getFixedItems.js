export const getFixedItems = (data) => {
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

  for (let i = fixedItems.objects.length - 1; i >= 0; i--) {
    let item = fixedItems.objects[i];
    if (item.id === "logout" && data.fixedContent.logoutUrl) {
      item.link = data.fixedContent.logoutUrl;
    } else if (
      item.id === "userPreferences" &&
      data.fixedContent.userPreferencesUrl
    ) {
      item.link = data.fixedContent.userPreferencesUrl;
    } else if (
      item.id === "userSettings" &&
      data.fixedContent.userSettingsUrl
    ) {
      item.link = data.fixedContent.userSettingsUrl;
    }

    if (
      (item.id === "logout" && !data.fixedContent.logoutUrl) ||
      (item.id === "userPreferences" &&
        !data.fixedContent.userPreferencesUrl) ||
      (item.id === "userSettings" && !data.fixedContent.userSettingsUrl)
    ) {
      fixedItems.objects.splice(i, 1);
    }
  }

  return fixedItems;
};
