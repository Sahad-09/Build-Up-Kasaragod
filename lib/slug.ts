export const memberSlugFromName = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, "-");

