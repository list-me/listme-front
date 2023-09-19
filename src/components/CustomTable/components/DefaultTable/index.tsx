/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useCallback, useEffect, useState } from "react";
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
  template,
  renderHeaderComponent,
  hidden,
  handleResize,
  columns,
  handleMove,
  uploadImages,
}: IDefaultTable): JSX.Element {
  useEffect(() => {
    if (hotRef.current) {
      const handleKeyDown = (event: KeyboardEvent) => {
        handleDocumentKeyDown(event, hotRef);
      };

      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [hotRef]);
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
  const svgStringDropDown: string = renderToString(<DropDownIcon />);

  const customRendererDropdown = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      _col: number,
      _prop: string | number,
      value: string | null,
    ): void => {
      td.innerHTML = `
        <div class="dropdown-item">
          ${value ?? ""}
          ${svgStringDropDown}
        </div>
      `;
    },
    [svgStringDropDown],
  );

  const customRendererRadio = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      _col: number,
      _prop: string | number,
      value: string | null,
    ): void => {
      td.innerHTML = `<div class="radio-item">
        ${value ?? ""}
        ${svgStringDropDown}
      </div>`;
    },
    [svgStringDropDown],
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

  const customRendererRelation = useCallback(
    (
      instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
    ): void => {
      if (typeof value === "string") {
        try {
          value = JSON.parse(value);
        } catch (e) {
          console.error("Failed to parse JSON:", e);
          value = [];
        }
      }

      const totalItems = Array.isArray(value) ? value.length : 0;

      td.innerHTML = `<div class="tag-content">${totalItems} Items relacionados</div>`;
    },
    [],
  );

  const [widthTable, setWidthTable] = useState(0);
  const elements = document.querySelectorAll(".wtHider");
  useEffect(() => {
    if (elements.length) {
      const sizes = Array.from(elements).map(
        (item: Element) => item.clientWidth,
      );
      const maxWidth = Math.max(...sizes);
      setWidthTable(maxWidth);
    }
  }, [elements]);

  return (
    <HotTable
      readOnly={isTableLocked}
      ref={hotRef}
      colHeaders={headers}
      columns={cols}
      data={dataProvider}
      height="auto"
      width={widthTable}
      stretchH="all"
      manualColumnResize
      filters
      autoRowSize={false}
      autoColumnSize={false}
      manualColumnMove
      search
      renderAllRows={false}
      viewportRowRenderingOffset={dataProvider.length}
      viewportColumnRenderingOffset={cols.length}
      rowHeaders
      columnSorting={{ sortEmptyCells: false, headerAction: false }}
      rowHeights="52px"
      licenseKey="non-commercial-and-evaluation"
      afterChange={afterChangeCallback}
      beforeCopy={beforeCopyCallback}
      afterPaste={afterPasteCallback}
      afterGetColHeader={renderHeaderComponent}
      hiddenColumns={{ columns: hidden, indicators: true }}
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
