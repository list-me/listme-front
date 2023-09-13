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
import { FileEditor } from "../../Editors/File";
import DropdownEditor from "../../Editors/Dropdown";
import RadioEditor from "../../Editors/Radio";
import RelationEditor from "../../Editors/Relation";
import { ReactComponent as DropDownIcon } from "../../../../assets/chevron-down.svg";
import { IDefaultTable } from "./DefaultTable";
import handleCellChange from "./utils/handleCellChange";
import handleBeforeCopy from "./utils/handleBeforeCopy";
import handleAfterPaste from "./utils/handleAfterPaste";
import handleAfterScrollVertically from "./utils/handleAfterScrollVertically";
import handleAfterColumnMove from "./utils/handleAfterColumnMove";
import handleRemoveRow from "./utils/handleRemoveRow";
import hasAtLeastOneProduct from "./utils/hasAtLeastOneProduct";
import handleDocumentKeyDown from "./utils/handleDocumentKeyDown";
import customRendererFile from "./utils/customRendererFile";

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
  if (hotRef.current)
    document.addEventListener("keydown", (event) => {
      handleDocumentKeyDown(event, hotRef);
    });
  const [isTableLocked, setIsTableLocked] = useState(false);

  const afterChangeCallback = async (
    changes: Handsontable.CellChange[] | null,
    source: any,
  ) => {
    if (source === "CopyPaste.paste") return;

    if (hotRef.current) {
      const { hotInstance } = hotRef.current;
      await handleCellChange(
        changes,
        hotInstance,
        isTableLocked,
        setIsTableLocked,
        handleSave,
        dataProvider,
        setDataProvider,
      );
    }
  };

  const beforeCopyCallback = (data: CellValue[][], coords: RangeType[]) => {
    handleBeforeCopy(data, coords, hotRef, cols);
  };

  const afterPasteCallback = async (
    data: CellValue[][],
    coords: RangeType[],
  ) => {
    await handleAfterPaste(
      data,
      coords,
      hotRef,
      isTableLocked,
      loadingRef,
      cols,
      dataProvider,
      componentCellPerType,
      handleSave,
    );
  };

  const afterScrollVerticallyCallback = (): void => {
    handleAfterScrollVertically(
      hotRef,
      total,
      dataProvider,
      loadingRef,
      setIsTableLocked,
      handleGetProductsFiltered,
      currentKeyword,
      template,
    );
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
      columns,
      setHeaders,
      handleMove,
    );
  };

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

  const customRendererFileCallBack = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
    ) => {
      customRendererFile(
        _instance,
        td,
        row,
        col,
        prop,
        value,
        hotRef,
        loadingRef,
        uploadImages,
        template,
      );
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
                  handleRemoveRow(
                    hotInstance,
                    selection,
                    handleDelete,
                    dataProvider,
                  );
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
              renderer={customRendererFileCallBack}
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
