/* eslint-disable @typescript-eslint/no-unused-vars */

import { getFilenameFromUrl } from ".";
import DocumentIcon from "../assets/icons/document-icon.svg";
import ImageErrorIcon from "../assets/icons/image-error-icon.svg";

function getImage(value: any, template: any): void {
  let newValue: any;
  if (typeof value === "string" && value.length) {
    value = JSON.parse(value);
  }

  newValue = value.map((url: string) => {
    let imageSource: string = "";

    const regex = /https:\/\/[^/]+\//;
    const verifyTrue = regex.test(url);
    let newImageUrl = "";
    if (url !== null) {
      newImageUrl = verifyTrue ? url : `${template[0].bucket}/${url}`;
    }
    imageSource = newImageUrl;

    const fileNameWithExtension: string = getFilenameFromUrl(newImageUrl);

    const placeholder: string = `<img class="imgItem" loading="lazy" title="${fileNameWithExtension}" src="${imageSource}" style="width:25px;height:25px;margin-right:4px;">`;
    return placeholder;
  });
  return newValue;
}

export default getImage;
