import { getFilenameFromUrl } from ".";
import DocumentIcon from "../assets/icons/document-icon.svg";

async function getImage(
  value: any,
  template: any,
): Promise<string | undefined> {
  if (typeof value === "string" && value.length) {
    value = JSON.parse(value);
  }
  if (value?.length) {
    console.log(value);
    let newValue = "";
    newValue = value.map((url: string) => {
      let imageSource: string = "";

      const regex = /https:\/\/[^/]+\//;
      const verifyTrue = regex.test(url);
      let newImageUrl = "";
      if (url !== null) {
        if (!verifyTrue) console.log(`${template[0].bucket}/${url}`);
        newImageUrl = verifyTrue ? url : `${template[0].bucket}/${url}`;
      }
      imageSource = newImageUrl;

      const fileNameWithExtension: string = getFilenameFromUrl(url);

      const lastDotIndex: number = fileNameWithExtension.lastIndexOf(".");
      const fileType: string = fileNameWithExtension.substring(
        lastDotIndex + 1,
      );
      console.log("🚀 ~ newValue=value.map ~ fileType:", fileType);

      if (!["jpg", "jpeg", "png", "thumb", "svg", "webp"].includes(fileType)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        imageSource = DocumentIcon;
      }

      const placeholder: string = `<img class="imgItem" title="${fileNameWithExtension}" loading='lazy' src="${imageSource}" style="width:25px;height:25px;margin-right:4px;">`;
      return placeholder;
    });

    return newValue;
  }
  return undefined;
}

export default getImage;
