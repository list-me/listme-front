/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import Handsontable from "handsontable";
import { toast } from "react-toastify";
import { HotTable } from "@handsontable/react";
import { getFilenameFromUrl } from "../../../../../utils";
import DocumentIcon from "../../../../../assets/icons/document-icon.svg";
import ImageErrorIcon from "../../../../../assets/icons/image-error-icon.svg";

function customRendererFile(
  _instance: Handsontable,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: any,
  hotRef: React.RefObject<HotTable>,
  loadingRef: React.RefObject<HTMLDivElement>,
  uploadImages: (
    files: File[],
    bucketUrl: string,
    companyId: string,
    optionals?: { brand?: string; name?: string },
  ) => Promise<void | string[]>,
  template: any,
  totalExistingImages: number,
  limit: number,
): void {
  let totalImages = totalExistingImages;

  if (value && Array.isArray(value)) {
    totalImages += value.length;
  }

  td.className = "file-cell";

  td.draggable = true;
  td.ondragover = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  td.ondragleave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    td.classList.remove("drag-over");
  };

  td.ondragenter = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target as HTMLElement;
    if (target.tagName === "TD") {
      td.classList.add("drag-over");
    }
  };

  td.ondrop = async (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // if (totalImages >= limit) {
    //   toast.warn(`Limite de imagens excedido`);
    //   return;
    // }

    const { hotInstance } = hotRef.current!;
    const target = event.target as HTMLElement;
    const cellElement = target.closest(".handsontable .file-cell");
    if (cellElement && hotInstance) {
      td.classList.remove("drag-over");
      loadingRef.current!.style.display = "block";
      try {
        let currentValue: Array<string> = JSON.parse(
          cellElement.getAttribute("data-new-value") || "[]",
        );

        if (value && typeof value === "object")
          currentValue = currentValue
            .filter((item: any) => !value.includes(item))
            .concat(
              value?.filter((item1: any) => !currentValue.includes(item1)),
            );

        if (event.dataTransfer?.files.length) {
          const { files } = event.dataTransfer;
          const parsedFiles: Array<File> = Array.from(files);

          const optionals = {
            brand: "",
            name: "",
          };

          if (template.id === "8956d969-d769-4f09-8736-e0b4d73b3e3d") {
            const brand = _instance.getDataAtRowProp(row, "730291");
            optionals.brand = brand?.length ? brand[0]?.id : undefined;
            optionals.name = _instance.getDataAtRowProp(row, "474091");
          }

          if (template.id === "a13f5317-d855-4766-9063-c916f4d90b83") {
            const brand = _instance.getDataAtRowProp(row, "956614");
            optionals.brand = brand?.length ? brand[0]?.id : undefined;
            optionals.name = _instance.getDataAtRowProp(row, "889711");
          }

          const newFiles: Array<string> | void = await uploadImages(
            parsedFiles,
            template.id,
            template.companyId,
            optionals,
          );

          if (newFiles && newFiles.length) {
            let newValue = [];
            if (currentValue) {
              if (typeof currentValue === "object") {
                newValue = [...currentValue, ...newFiles];
              } else {
                newValue = [currentValue, ...newFiles];
              }
            } else {
              newValue = [...newFiles];
            }

            const changes: any = hotInstance.getSourceDataAtRow(row);
            changes[prop] = newValue;
            hotInstance.setDataAtCell(row, col, newValue);
          }
        }

        hotInstance.selectCell(row, col);

        loadingRef.current!.style.display = "none";
      } catch (error) {
        loadingRef.current!.style.display = "none";

        if (error instanceof Error) toast.error(error.message);
      }
    }
  };
  td.innerHTML = value;
}

export default customRendererFile;
