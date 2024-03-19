import { getFilenameFromUrl } from ".";
import DocumentIcon from "../assets/icons/document-icon.svg";
import ImageErrorIcon from "../assets/icons/image-error-icon.svg";

async function getImage(
  value: any,
  template: any,
): Promise<string | undefined> {
  if (typeof value === "string" && value.length) {
    value = JSON.parse(value);
  }
  if (value?.length) {
    let newValue = "";
    newValue = value
      .map((url: string) => {
        let imageSource: string = "";

        const regex = /https:\/\/[^/]+\//;
        const verifyTrue = regex.test(url);
        let newImageUrl = "";
        if (url !== null) {
          newImageUrl = verifyTrue ? url : `${template.bucket}/${url}`;
        }
        imageSource = newImageUrl;

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

        const placeholder: string = `<img class="imgItem" title="${fileNameWithExtension}" loading='lazy' src="${imageSource}" style="width:25px;height:25px;margin-right:4px;">`;
        return placeholder;
      })
      .join("");
    return newValue;
    // const imgUrl: string = value[value.length - 1];
    // fetch(imgUrl, { method: "HEAD", cache: "no-cache" })
    //   .then((response: Response) => {
    //     const contentLength: string | null =
    //       response.headers.get("Content-Length");

    //     // eslint-disable-next-line radix
    //     if (contentLength && parseInt(contentLength) <= 1000 * 1024) {
    //       const regex = /https:\/\/[^/]+\//;
    //       const verifyTrue = regex.test(imgUrl);
    //       let newImageUrl = "";
    //       if (imgUrl !== null) {
    //         newImageUrl = verifyTrue ? imgUrl : `${template.bucket}/${imgUrl}`;
    //       }
    //       let imageSource: string = newImageUrl;
    //       const fileNameWithExtension: string = getFilenameFromUrl(newImageUrl);
    //       const lastDotIndex: number = fileNameWithExtension.lastIndexOf(".");
    //       const fileType: string = fileNameWithExtension.substring(
    //         lastDotIndex + 1,
    //       );

    //       if (
    //         !["jpg", "jpeg", "png", "thumb", "svg", "webp"].includes(fileType)
    //       ) {
    //         imageSource = DocumentIcon;
    //       }

    //       const imgTag: string = `<img class="imgItem" title="${fileNameWithExtension}" src="${imageSource}" style="width:25px;height:25px; margin-right:4px;" loading="lazy">`;
    //       newValue =
    //         value.length > 1
    //           ? `<div style="display:flex; align-items: center; margin-top: 16px; margin-left: 8px;">
    //       ${imgTag.concat(
    //         `<div class="itens-amount"> +${value.length - 1}</div>`,
    //       )} </div>`
    //           : imgTag;

    //       return newValue;
    //     }
    //     return newValue;
    //   })
    //   .catch((error) => {
    //     console.error("Erro ao verificar o tamanho da imagem:", error);
    //   });
  }
  return undefined;
}

export default getImage;
