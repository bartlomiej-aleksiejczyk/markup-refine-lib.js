export function validateTopbarItems(data) {
  const validateItem = (item) => {
    if (!item.defaultName || !item.id || !item.type) return false;

    let isValidType = false;
    switch (item.type) {
      case "link":
        isValidType = item.link && !item.objects;
        break;
      case "container":
        isValidType =
          item.objects &&
          Array.isArray(item.objects) &&
          item.objects.every(validateItem);
        break;
      default:
        return false;
    }

    if (item.iconName && typeof item.iconName !== "string") return false;

    const allowedProperties = [
      "defaultName",
      "id",
      "type",
      "link",
      "iconName",
      "objects",
    ];
    const hasOnlyAllowedProperties = Object.keys(item).every((key) =>
      allowedProperties.includes(key)
    );

    return isValidType && hasOnlyAllowedProperties;
  };

  return Array.isArray(data.content) && data.content.every(validateItem);
}
