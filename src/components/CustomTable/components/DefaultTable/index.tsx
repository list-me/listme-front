/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useState } from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import { toast } from "react-toastify";
import Handsontable from "handsontable";
import { CellValue, RangeType } from "handsontable/common";
import { renderToString } from "react-dom/server";
import {
  isEquivalent,
  generateUUID,
  getFilenameFromUrl,
} from "../../../../utils";
import { FileEditor } from "../../Editors/File";
import DropdownEditor from "../../Editors/Dropdown";
import RadioEditor from "../../Editors/Radio";
import RelationEditor from "../../Editors/Relation";
import { ReactComponent as DropDownIcon } from "../../../../assets/chevron-down.svg";
import DocumentIcon from "../../../../assets/icons/document-icon.svg";
import ImageErrorIcon from "../../../../assets/icons/image-error-icon.svg";
import { IDefaultTable } from "./DefaultTable";

function DefaultTable({
  hotRef,
  headers,
  setHeaders,
  cols,
  dataProvider,
  setDataProvider,
  handleDelete,
  handleSave,
  loadingRef,
  componentCellPerType,
  total,
  handleGetProductsFiltered,
  currentKeyword,
  template,
  renderHeaderComponent,
  hidden,
  handleResize,
  columns,
  handleMove,
  uploadImages,
}: IDefaultTable): JSX.Element {
  const [isTableLocked, setIsTableLocked] = useState(false);

  function hasAtLeastOneProduct(dataProv: any[]) {
    return dataProv?.length > 0;
  }
  function isSelectedRowEmpty(
    hotInstance: Handsontable | null,
    selection: any[],
  ) {
    return hotInstance?.isEmptyRow(selection[0].start.row);
  }
  async function handleRemoveRow(
    hotInstance: Handsontable | null,
    selection: any[],
  ) {
    if (isSelectedRowEmpty(hotInstance, selection)) {
      hotInstance?.alter("remove_row", selection[0].start.row);
    } else {
      await handleDelete(dataProvider[selection[0].start.row]);
      hotInstance?.alter("remove_row", selection[0].start.row);
    }
  }

  const handleCellChange = async (
    changes: any,
    hotInstance: Handsontable | null | undefined,
  ) => {
    if (changes !== null && changes.length && !isTableLocked && hotInstance) {
      const isNew = !!dataProvider[changes[0][0]].id;
      const customChanges = changes as Handsontable.CellChange[];
      if (
        typeof customChanges[0][2] === "object" &&
        typeof customChanges[0][3] === "object" &&
        !isEquivalent(customChanges[0][2], customChanges[0][3])
      ) {
        try {
          if (!isNew) setIsTableLocked(true);
          const id = await handleSave(
            dataProvider[customChanges[0][0]],
            isNew,
            dataProvider[customChanges[0][0]]?.id,
          );
          if (
            id &&
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
              id.toString(),
            )
          ) {
            const updated = dataProvider;
            updated[customChanges[0][0]].id = id;
            setDataProvider(updated);
          }
        } finally {
          if (!isNew) setIsTableLocked(false);
          console.log("BF");
        }
      }
      if (
        typeof customChanges[0][2] !== "object" &&
        customChanges[0][2] !== customChanges[0][3] &&
        dataProvider.length
      ) {
        console.log("Changes", { changes });
        try {
          if (!isNew) setIsTableLocked(true);
          const id = await handleSave(
            dataProvider[customChanges[0][0]],
            isNew,
            dataProvider[customChanges[0][0]]?.id,
          );
          if (
            id &&
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
              id.toString(),
            )
          ) {
            const updated = dataProvider;
            updated[customChanges[0][0]].id = id;
            setDataProvider(updated);
          }
        } finally {
          if (!isNew) setIsTableLocked(false);
        }
      }
    }
  };
  const afterChangeCallback = async (
    changes: Handsontable.CellChange[] | null,
    source: any,
  ) => {
    if (source === "CopyPaste.paste") return;

    if (hotRef.current) {
      const { hotInstance } = hotRef.current;
      await handleCellChange(changes, hotInstance);
    }
  };

  const handleBeforeCopy = (data: CellValue[][], coords: RangeType[]) => {
    for (let i = 0; i < coords.length; i++) {
      const { startRow, startCol, endRow, endCol } = coords[i];
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const cellData = hotRef.current!.hotInstance?.getDataAtCell(row, col);
          const cell = hotRef.current!?.hotInstance?.getCellMeta(row, col);
          const column = cols.find((colItem) => colItem.data === cell?.prop);
          if (
            cellData &&
            ["relation", "file", "checked"].includes(column.type)
          ) {
            data[row - startRow][col - startCol] = JSON.stringify(cellData);
          }
        }
      }
    }
  };

  const beforeCopyCallback = (data: CellValue[][], coords: RangeType[]) => {
    handleBeforeCopy(data, coords);
  };

  const getRowsInterval = (start: number, end: number): Array<number> => {
    if (start > end) {
      [start, end] = [end, start];
    }

    const result: Array<number> = [];
    for (let i: number = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  };

  const handleAfterPaste = async (data: CellValue[][], coords: RangeType[]) => {
    const { hotInstance } = hotRef.current!;
    if (data.length && !isTableLocked && hotInstance) {
      loadingRef.current!.style.display = "block";

      const range = coords[0];
      const fieldColumns = cols
        .slice(range.startCol, range.endCol + 1)
        .map((column) => {
          return { field: column.data, type: column.type };
        });

      const rangeOfRows: number = range.endRow - range.startRow + 1;
      const rows: number[] = getRowsInterval(range.startRow, range.endRow);

      const changesPromises: Array<any> = [];
      for (let i = 0; rangeOfRows > i; i++) {
        const row: number = rows[i];
        const changes = dataProvider[row];

        fieldColumns.forEach((column: any, index: number): void => {
          const position: number = data.length > 1 ? i : 0;

          if (
            ["relation", "file", "checked"].includes(column.type) &&
            data[position][index]
          ) {
            changes[column.field] = JSON.parse(data[position][index]);
          } else {
            let value = Object.keys(componentCellPerType).includes(
              column.type.toString().toUpperCase(),
            )
              ? [data[position][index]]
              : data[position][index];

            if (Array.isArray(value) && value[0] === "") {
              value = [];
            }
            changes[column.field] = value;
          }
        });

        changesPromises.push(changes);
      }

      for await (const item of changesPromises) {
        const isNew: boolean = !!item?.id;
        if (!isNew) item.id = item?.id ?? generateUUID();

        await handleSave(item, isNew, item.id);
      }

      loadingRef.current!.style.display = "none";

      if (hotInstance) {
        hotInstance.render();
      }
    }
  };
  const afterPasteCallback = async (
    data: CellValue[][],
    coords: RangeType[],
  ) => {
    await handleAfterPaste(data, coords);
  };

  const handleAfterScrollVertically = (): void => {
    const { hotInstance } = hotRef.current!;
    if (hotInstance) {
      const holder = hotInstance.rootElement.querySelector(".wtHolder");
      if (holder) {
        const scrollableHeight = holder.scrollHeight * 0.75;
        const { scrollTop } = holder;
        const visibleHeight = holder.clientHeight;

        if (
          scrollTop + visibleHeight >= scrollableHeight &&
          total > dataProvider.length
        ) {
          loadingRef.current!.style.display = "block";
          setIsTableLocked(true);
          handleGetProductsFiltered(currentKeyword, template.id);
        }
      }
    }
  };

  const afterScrollVerticallyCallback = (): void => {
    handleAfterScrollVertically();
  };

  const handleAfterColumnMove = (
    movedColumns: number[],
    finalIndex: number,
    dropIndex: number | undefined,
    movePossible: boolean,
    orderChanged: boolean,
  ): void => {
    if (!orderChanged) return;

    let newColumns = [...columns];
    movedColumns.forEach((oldIndex) => {
      const movedColumn = newColumns.splice(oldIndex, 1)[0];
      newColumns.splice(finalIndex, 0, movedColumn);
      finalIndex += 1;
    });

    newColumns = newColumns.map((item, index) => {
      if (Object.keys(item).length) {
        return {
          ...item,
          order: index.toString(),
        };
      }
      return item;
    });

    setHeaders(newColumns.map((item) => item?.title ?? " "));
    handleMove(newColumns);
  };

  const afterColumnMoveCallback = (
    movedColumns: number[],
    finalIndex: number,
    dropIndex: number | undefined,
    movePossible: boolean,
    orderChanged: boolean,
  ): void => {
    handleAfterColumnMove(
      movedColumns,
      finalIndex,
      dropIndex,
      movePossible,
      orderChanged,
    );
  };

  const handleDocumentKeyDown = (event: KeyboardEvent): void => {
    const { hotInstance } = hotRef.current!;
    if (hotInstance) {
      if (event.key === "ArrowRight" && event.ctrlKey) {
        const selected = hotInstance.getSelected();
        if (selected) {
          const [startRow, , endRow] = selected[0];

          let lastVisibleCol = hotInstance.countCols() - 2;
          while (
            hotInstance.getColWidth(lastVisibleCol) === 0 &&
            lastVisibleCol >= 0
          ) {
            // eslint-disable-next-line no-plusplus
            lastVisibleCol--;
          }

          if (lastVisibleCol >= 0) {
            hotInstance.selectCell(
              startRow,
              lastVisibleCol,
              endRow,
              lastVisibleCol,
            );
          }
        }
        event.preventDefault();
      }
    }
  };

  if (hotRef.current)
    document.addEventListener("keydown", handleDocumentKeyDown);

  const customRendererRadio = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      _col: number,
      _prop: string | number,
      value: string | null,
    ): void => {
      const svgString: string = renderToString(<DropDownIcon />);

      td.innerHTML = `<div class="radio-item">
        ${value ?? ""}
        ${svgString}
      </div>`;
    },
    [],
  );

  const customRendererFile = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
    ) => {
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
              const newFiles: Array<string> | void = await uploadImages(
                parsedFiles,
                template.id,
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

            hotInstance.selectCell(row, col + 1);

            loadingRef.current!.style.display = "none";
          } catch (error) {
            loadingRef.current!.style.display = "none";

            if (error instanceof Error) toast.error(error.message);
          }
        }
      };

      if (typeof value === "string" && value.length) {
        value = JSON.parse(value);
      }

      if (value?.length) {
        td.innerHTML = value
          .map((url: string) => {
            let imageSource: string = url;
            const fileNameWithExtension: string = getFilenameFromUrl(url);
            const lastDotIndex: number = fileNameWithExtension.lastIndexOf(".");
            const fileType: string = fileNameWithExtension.substring(
              lastDotIndex + 1,
            );

            if (!["jpg", "jpeg", "png", "thumb", "svg"].includes(fileType)) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              imageSource = DocumentIcon;
            }

            const placeholder: string = `<img class="imgItem" title="${fileNameWithExtension}" src="${ImageErrorIcon}" style="width:25px;height:25px;margin-right:4px;">`;

            return placeholder;
          })
          .join("");

        const imgUrl: string = value[value.length - 1];
        fetch(imgUrl, { method: "HEAD", cache: "no-cache" })
          .then((response: Response) => {
            const contentLength: string | null =
              response.headers.get("Content-Length");

            if (contentLength && parseInt(contentLength) <= 1000 * 1024) {
              let imageSource: string = imgUrl;
              const fileNameWithExtension: string = getFilenameFromUrl(imgUrl);
              const lastDotIndex: number =
                fileNameWithExtension.lastIndexOf(".");
              const fileType: string = fileNameWithExtension.substring(
                lastDotIndex + 1,
              );

              if (!["jpg", "jpeg", "png", "thumb", "svg"].includes(fileType)) {
                imageSource = DocumentIcon;
              }

              const imgTag: string = `<img class="imgItem" title="${fileNameWithExtension}" src="${imageSource}" style="width:25px;height:25px; margin-right:4px;">`;
              td.innerHTML =
                value.length > 1
                  ? `<div style="display:flex; align-items: center; margin-top: 16px; margin-left: 8px;">
                      ${imgTag.concat(
                        `<div class="itens-amount"> +${value.length - 1}</div>`,
                      )} </div>`
                  : imgTag;
            }
          })
          .catch((error) => {
            console.error("Erro ao verificar o tamanho da imagem:", error);
          });
      } else {
        td.innerHTML = "";
      }
    },
    [],
  );

  const customRendererDropdown = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      _col: number,
      _prop: string | number,
      value: string | null,
    ): void => {
      const svgString: string = renderToString(<DropDownIcon />);

      td.innerHTML = `<div class="dropdown-item">
        ${value ?? ""}
        ${svgString}
      </div>`;
    },
    [],
  );

  const customRendererRelation = useCallback(
    (
      instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
    ): void => {
      if (typeof value === "string" && value.length) value = JSON.parse(value);

      const totalItems = value ? value.length : 0;
      td.innerHTML = `<div class="tag-content">${totalItems} Items relacionados</div>`;
    },
    [],
  );

  return (
    <HotTable
      readOnly={isTableLocked}
      ref={hotRef}
      colHeaders={headers}
      columns={cols}
      data={dataProvider}
      height="100%"
      width="100%"
      stretchH="all"
      manualColumnResize
      filters
      autoRowSize={false}
      autoColumnSize={false}
      manualColumnMove
      search
      renderAllRows={false}
      viewportRowRenderingOffset={200}
      viewportColumnRenderingOffset={30}
      rowHeaders
      columnSorting={{ sortEmptyCells: false, headerAction: false }}
      rowHeights="52px"
      licenseKey="non-commercial-and-evaluation"
      afterChange={afterChangeCallback}
      beforeCopy={beforeCopyCallback}
      afterPaste={afterPasteCallback}
      afterGetColHeader={renderHeaderComponent}
      hiddenColumns={{ columns: hidden, indicators: true }}
      afterScrollVertically={afterScrollVerticallyCallback}
      fixedColumnsStart={1}
      contextMenu={{
        items: {
          remove_row: {
            name: "Excluir produto",
            async callback(key: string, selection: any[]) {
              const { hotInstance } = hotRef.current!;
              if (hasAtLeastOneProduct(dataProvider)) {
                if (hotInstance) {
                  handleRemoveRow(hotInstance, selection);
                }
              } else {
                toast.warn("O catálogo deve conter ao menos um produto");
              }
            },
          },
        },
      }}
      afterRenderer={(TD, row, col) => {
        if (col + 1 === headers.length) {
          TD.style.display = "none";
        }
      }}
      afterColumnResize={async (newSize: number, column: number) => {
        await handleResize(column, newSize, template);
      }}
      afterColumnMove={afterColumnMoveCallback}
    >
      {cols.map((col: any, index: number) => {
        if (col.isCustom && col.type === "list") {
          return (
            <HotColumn
              width={col.width}
              _columnIndex={col.order}
              data={col.data}
              key={`${index}${col.data}`}
              renderer={customRendererDropdown}
            >
              <DropdownEditor
                hot-editor
                options={[...col.options, ""]}
                editorColumnScope={0}
              />
            </HotColumn>
          );
        }

        if (col.isCustom && col.type === "radio") {
          return (
            <HotColumn
              width={col.width}
              _columnIndex={col.order}
              data={col.data}
              key={`${index}${col.data}`}
              renderer={customRendererRadio}
            >
              <RadioEditor
                hot-editor
                options={[...col.options, ""]}
                editorColumnScope={0}
              />
            </HotColumn>
          );
        }

        if (col.isCustom && col.type === "file") {
          return (
            <HotColumn
              width={col.width}
              _columnIndex={col.order}
              data={col.data}
              key={`${index}${col.data}`}
              renderer={customRendererFile}
            >
              <FileEditor
                hot-editor
                editorColumnScope={0}
                templateId={template.id}
                dataProvider={dataProvider}
              />
            </HotColumn>
          );
        }

        if (col.type === "relation") {
          return (
            <HotColumn
              _columnIndex={col.order}
              data={col.data}
              width={col.width}
              key={`${index}${col.data}`}
              // eslint-disable-next-line react/jsx-no-bind
              renderer={customRendererRelation}
            >
              <RelationEditor
                hot-editor
                editorColumnScope={0}
                templateId={col.options[0].templateId}
                column={col}
                dataProvider={dataProvider}
                field={col.options[0].field}
              />
            </HotColumn>
          );
        }

        return (
          <HotColumn
            width={col.width}
            _columnIndex={col.order}
            data={col.data}
            key={`${index}${col.data}`}
          />
        );
      })}
    </HotTable>
  );
}

export default DefaultTable;
