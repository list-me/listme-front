/* eslint-disable no-bitwise */
export const isEquivalent = (a: any, b: any) => {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i += 1) {
    const propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
};

export const getFilenameFromUrl = (urlString: string): string | null => {
  try {
    const url = new URL(urlString);
    const { pathname } = url;
    const parts = pathname.split("/");
    return parts[parts.length - 1];
  } catch (error) {
    console.error("Invalid URL:", urlString);
    return null;
  }
};

export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
