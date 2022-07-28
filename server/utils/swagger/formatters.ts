export const capitalize = (text) =>
  (text && text[0].toUpperCase() + text.slice(1)) || "";

export const camelcaseToText = (text) => text.replace(/([A-Z])/g, " $1");

export const prettifyTagName = (tag) =>
  capitalize(camelcaseToText(tag.replace("Handler", "")));
