import { ReactElement, useCallback, useEffect, useState } from "react";
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
import { ReactComponent as DropDownIconSmall } from "../../../../assets/chevron-down-small.svg";
import { ReactComponent as TextIcon } from "../../../../assets/icons/headers/text-icon.svg";
import { ReactComponent as ParagraphIcon } from "../../../../assets/icons/headers/textarea-icon.svg";
import { ReactComponent as CheckedIcon } from "../../../../assets/icons/headers/checked-icon.svg";
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/headers/dropdown-icon.svg";
import { ReactComponent as FileIcon } from "../../../../assets/icons/headers/file-icon.svg";
import { ReactComponent as RadioIcon } from "../../../../assets/icons/headers/radio-icon.svg";
import { ReactComponent as RelationIcon } from "../../../../assets/icons/headers/relation-icon.svg";
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
import HeaderDropDown from "../HeaderDropDown";
import { IDropDownStatus } from "../HeaderDropDown/HeaderDropDown";
import { IconType } from "../HeaderDropDown/components/Cell/Cell.d";
import getStyledContent from "./utils/getStyledContent";

function DefaultTable({
  hotRef,
  colHeaders,
  setColHeaders,
  cols,
  products,
  setProducts,
  handleDelete,
  handleSave,
  loadingRef,
  componentCellPerType,
  total,
  setTotal,
  template,
  handleResize,
  columns,
  setColumns,
  handleMove,
  uploadImages,
  page,
  setPage,
  headerTable,
  currentKeyword,
  handleNewColumn,
  handleHidden,
}: IDefaultTable): JSX.Element {
  const svgStringDropDown: string = renderToString(<DropDownIcon />);
  const svgStringDropDownSmall: string = renderToString(<DropDownIconSmall />);
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
    source: string,
  ): Promise<void> => {
    if (source === "CopyPaste.paste") return;

    if (hotRef.current) {
      const { hotInstance } = hotRef.current;
      await handleCellChange(
        changes,
        hotInstance,
        isTableLocked,
        setIsTableLocked,
        handleSave,
        products,
        setProducts,
      );
    }
  };

  const beforeCopyCallback = (
    data: CellValue[][],
    coords: RangeType[],
  ): void => {
    handleBeforeCopy(data, coords, hotRef, cols);
  };

  const afterPasteCallback = async (
    data: CellValue[][],
    coords: RangeType[],
  ): Promise<void> => {
    await handleAfterPaste(
      data,
      coords,
      hotRef,
      isTableLocked,
      loadingRef,
      cols,
      products,
      componentCellPerType,
      handleSave,
    );
  };

  const afterScrollVerticallyCallback = (): void => {
    handleAfterScrollVertically(
      hotRef,
      total,
      setTotal,
      products,
      setProducts,
      loadingRef,
      setIsTableLocked,
      template,
      page,
      setPage,
      headerTable,
      componentCellPerType,
      currentKeyword,
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
      setColHeaders,
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
      // eslint-disable-next-line no-param-reassign
      td.innerHTML = `<div class="radio-item">
        ${value ?? ""}
        ${svgStringDropDown}
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
      // eslint-disable-next-line no-param-reassign
      td.innerHTML = `<div class="dropdown-item">
        ${value ?? ""}
        ${svgStringDropDown}
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

  const ICON_HEADER: Record<IconType, ReactElement> = {
    [IconType.Text]: <TextIcon />,
    [IconType.Paragraph]: <ParagraphIcon />,
    [IconType.Checked]: <CheckedIcon />,
    [IconType.List]: <DropdownIcon />,
    [IconType.File]: <FileIcon />,
    [IconType.Radio]: <RadioIcon />,
    [IconType.Relation]: <RelationIcon />,
  };
  const getIconByType = (type: IconType): ReactElement => {
    return ICON_HEADER[type];
  };
  const styledHeader = (
    column: number,
    TH: HTMLTableHeaderCellElement,
  ): void => {
    const colData = template?.fields?.fields.find(
      (item: any) => item.id === headerTable[column]?.data,
    );
    const { required: isRequired } = colData || {};
    const columnHeaderValue = hotRef.current?.hotInstance?.getColHeader(column);
    const valueToVisible = columnHeaderValue !== " " ? columnHeaderValue : "+";
    const iconType = getIconByType(colData?.type);

    TH.innerHTML = getStyledContent(iconType, valueToVisible, isRequired);
  };

  const [dropDownStatus, setDropDownStatus] = useState<IDropDownStatus>({
    type: "none",
    coordX: 0,
    coordY: 0,
    col: 0,
  });

  return (
    <>
      <HotTable
        readOnly={isTableLocked}
        ref={hotRef}
        colHeaders={colHeaders}
        columns={cols}
        data={products}
        manualColumnResize
        manualColumnMove
        rowHeaders
        rowHeights="52px"
        licenseKey="non-commercial-and-evaluation"
        fixedColumnsStart={1}
        afterScrollVertically={afterScrollVerticallyCallback}
        beforeCopy={beforeCopyCallback}
        afterPaste={afterPasteCallback}
        afterColumnMove={afterColumnMoveCallback}
        afterGetColHeader={styledHeader}
        afterColumnResize={async (newSize: number, column: number) => {
          await handleResize(column, newSize, template);
        }}
        afterOnCellMouseUp={(event: any, coords, TD) => {
          const clickedElementClassList = event.target.classList;
          const correctElement = clickedElementClassList.contains("dropDown");

          if (correctElement && coords.row === -1 && coords.col >= 0) {
            setTimeout(() => {
              if (colHeaders.length - 1 === coords.col) {
                setDropDownStatus({
                  type: "new",
                  coordX: event.clientX,
                  coordY: event.clientY,
                  col: coords.col,
                });
              } else {
                setDropDownStatus({
                  type: "cell",
                  coordX: event.clientX,
                  coordY: event.clientY,
                  col: coords.col,
                });
              }
            }, 0);
          } else {
            setDropDownStatus({
              type: "none",
              coordX: 0,
              coordY: 0,
              col: 0,
            });
          }
        }}
        afterRenderer={(TD, row, col) => {
          if (col + 1 === colHeaders.length) {
            // eslint-disable-next-line no-param-reassign
            TD.style.display = "none";
          }
        }}
        contextMenu={{
          items: {
            remove_row: {
              name: "Excluir produto",
              async callback(key: string, selection: any[]) {
                const { hotInstance } = hotRef.current!;
                if (hasAtLeastOneProduct(products)) {
                  if (hotInstance) {
                    handleRemoveRow(
                      hotInstance,
                      selection,
                      handleDelete,
                      products,
                    );
                  }
                } else {
                  toast.warn("O catálogo deve conter ao menos um produto");
                }
              },
            },
          },
        }}
        afterChange={afterChangeCallback}
      >
        {cols.map((col, index: number) => {
          if (col.isCustom && col.type === "list") {
            return (
              <HotColumn
                width={col.width}
                _columnIndex={+col.order}
                data={col.data}
                key={col.order + col.data}
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
                _columnIndex={+col.order}
                data={col.data}
                key={col.order + col.data}
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
                _columnIndex={+col.order}
                data={col.data}
                key={col.order + col.data}
                renderer={customRendererFileCallBack}
              >
                <FileEditor
                  hot-editor
                  editorColumnScope={0}
                  templateId={template.id}
                  dataProvider={products}
                />
              </HotColumn>
            );
          }

          if (col.type === "relation") {
            return (
              <HotColumn
                _columnIndex={+col.order}
                data={col.data}
                width={col.width}
                key={col.order + col.data}
                // eslint-disable-next-line react/jsx-no-bind
                renderer={customRendererRelation}
              >
                <RelationEditor
                  hot-editor
                  editorColumnScope={0}
                  // @ts-ignore
                  templateId={col.options[0].templateId}
                  column={col}
                  dataProvider={products}
                  // @ts-ignore
                  field={col.options[0].field}
                />
              </HotColumn>
            );
          }

          return (
            <HotColumn
              width={col.width}
              _columnIndex={+col.order}
              data={col.data}
              key={col.order + col.data}
            />
          );
        })}
      </HotTable>

      <HeaderDropDown
        dropDownStatus={dropDownStatus}
        setDropDownStatus={setDropDownStatus}
        template={template}
        columns={columns}
        setColumns={setColumns}
        colHeaders={colHeaders}
        setColHeaders={setColHeaders}
        handleNewColumn={handleNewColumn}
        hotRef={hotRef}
        handleHidden={handleHidden}
        headerTable={headerTable}
      />
    </>
  );
}

export default DefaultTable;
