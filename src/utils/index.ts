/* eslint-disable no-bitwise */
export const isEquivalent = (a: any, b: any): boolean => {
  // Caso ambos sejam arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEquivalent(a[i], b[i])) return false;
    }
    return true;
  }

  // Caso ambos sejam objetos
  if (
    typeof a === "object" &&
    a !== null &&
    typeof b === "object" &&
    b !== null
  ) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];
      if (!isEquivalent(a[propName], b[propName])) {
        return false;
      }
    }
    return true;
  }

  // Caso sejam valores primitivos
  return a === b;
};

export const getFilenameFromUrl = (urlString: string): string => {
  try {
    const regex = new RegExp(
      "http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+",
    );

    if (regex.test(urlString)) {
      const url = new URL(urlString);
      const { pathname } = url;
      const parts = pathname.split("/");
      return parts[parts.length - 1];
    }

    return "No name";
  } catch (error) {
    return "No name";
  }
};

export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
