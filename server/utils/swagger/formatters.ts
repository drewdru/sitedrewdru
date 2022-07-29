export const capitalize = (text: string) =>
  (text && text[0].toUpperCase() + text.slice(1)) || "";

export const camelcaseToText = (text: string) =>
  text.replace(/([A-Z])/g, " $1");

export const prettifyTagName = (tag: string) =>
  capitalize(camelcaseToText(tag.replace("Handler", "")));
