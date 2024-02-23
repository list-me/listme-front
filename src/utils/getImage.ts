import { getFilenameFromUrl } from ".";
import DocumentIcon from "../assets/icons/document-icon.svg";

async function getImage(value: any): Promise<string | undefined> {
  if (typeof value === "string" && value.length) {
    value = JSON.parse(value);
  }
  let newValue = "";
  if (value?.length) {
    newValue = value
      .map((url: string) => {
        let imageSource: string = url;
        const fileNameWithExtension: string = getFilenameFromUrl(url);
        const lastDotIndex: number = fileNameWithExtension.lastIndexOf(".");
        const fileType: string = fileNameWithExtension.substring(
          lastDotIndex + 1,
        );

        if (
          !["jpg", "jpeg", "png", "thumb", "svg", "webp"].includes(fileType)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          imageSource = DocumentIcon;
        }

        const placeholder: string = `<img class="imgItem" title="${fileNameWithExtension}" loading='lazy' src="${ImageErrorIcon}" style="width:25px;height:25px;margin-right:4px;">`;
        return placeholder;
      })
      .join("");

    const imgUrl: string = value[value.length - 1];
    try {
      const response = await fetch(imgUrl, {
        method: "HEAD",
        cache: "no-cache",
      });
      const contentLength: string | null =
        response.headers.get("Content-Length");

      if (contentLength && parseInt(contentLength, 10) <= 1000 * 1024) {
        let imageSource: string = imgUrl;
        const fileNameWithExtension: string = getFilenameFromUrl(imgUrl);
        const lastDotIndex: number = fileNameWithExtension.lastIndexOf(".");
        const fileType: string = fileNameWithExtension.substring(
          lastDotIndex + 1,
        );

        if (
          !["jpg", "jpeg", "png", "thumb", "svg", "webp"].includes(fileType)
        ) {
          imageSource = DocumentIcon;
        }

        const imgTag: string = `<img class="imgItem" title="${fileNameWithExtension}" src="${imageSource}" style="width:25px;height:25px; margin-right:4px;" loading="lazy">`;

        newValue =
          value.length > 1
            ? `<div style="display:flex; align-items: center; margin-top: 16px; margin-left: 8px;">
        ${imgTag.concat(
          `<div class="itens-amount"> +${value.length - 1}</div>`,
        )} </div>`
            : imgTag;
        return newValue;
      }
    } catch (error) {
      console.error("Erro ao verificar o tamanho da imagem:", error);
    }
  }
  return undefined;
}

export default getImage;
