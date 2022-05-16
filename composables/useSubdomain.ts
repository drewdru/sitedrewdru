import { useState } from "#app";

export const useSubdomain = () => {
  return useState("subdomain", () => "");
};
