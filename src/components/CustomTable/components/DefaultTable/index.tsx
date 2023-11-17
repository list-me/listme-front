import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import { toast } from "react-toastify";
import Handsontable from "handsontable";
import { CellValue, RangeType } from "handsontable/common";
import { renderToString } from "react-dom/server";
import { FileEditor } from "../../Editors/File";
import DropdownEditor from "../../Editors/Dropdown";
import RadioEditor from "../../Editors/Radio";
import CheckBoxEditor from "../../Editors/CheckBox";
import RelationEditor from "../../Editors/Relation";
import { ReactComponent as DropDownIcon } from "../../../../assets/chevron-down.svg";
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
import { ICol } from "../../CustomTable";
import disableMultiSelectionWithControl from "./utils/disableMultiSelectionWithControl";
import customRendererRadioComponent from "./components/customRendererRadioComponent";
import AlertTooltip from "./components/AlertTooltip";
import customRendererDropdownComponent from "./components/customRendererDropdownComponent";
import { useFilterContext } from "../../../../context/FilterContext";
import { useProductContext } from "../../../../context/products";
import customRendererCheckedComponent from "./components/customRendererCheckedComponent";

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
  setCurrentCell,
  setIsOpen,
  hidden,
  handleFreeze,
}: IDefaultTable): JSX.Element {
  const svgStringDropDown: string = renderToString(<DropDownIcon />);
  const [openAlertTooltip, setAlertTooltip] = useState(false);

  const { operator } = useFilterContext();
  const { conditionsFilter } = useProductContext();

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
      conditionsFilter,
      operator,
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
      handleMove,
      setColumns,
    );
  };

  const customRendererRadio = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      col: number,
      _prop: string | number,
      value: string | string[],
    ): void => {
      if (cols) {
        // eslint-disable-next-line no-param-reassign
        td.innerHTML = customRendererRadioComponent({
          columns,
          col,
          value,
          svgStringDropDown,
          setAlertTooltip,
        });
      }
    },
    [columns, svgStringDropDown],
  );
  const customRendererChecked = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      col: number,
      _prop: string | number,
      value: string | string[],
    ): void => {
      if (cols) {
        // eslint-disable-next-line no-param-reassign
        td.innerHTML = customRendererCheckedComponent({
          columns,
          col,
          value,
          svgStringDropDown,
          setAlertTooltip,
        });
      }
    },
    [columns, svgStringDropDown],
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
    [hotRef, loadingRef, template, uploadImages],
  );

  const customRendererDropdown = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      col: number,
      _prop: string | number,
      value: string | string[],
    ): void => {
      // eslint-disable-next-line no-param-reassign
      td.innerHTML = customRendererDropdownComponent({
        cols,
        col,
        value,
        svgStringDropDown,
        setAlertTooltip,
      });
    },
    [cols, svgStringDropDown],
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

  const ICON_HEADER = useMemo(
    () => ({
      [IconType.Text]: <TextIcon />,
      [IconType.Paragraph]: <ParagraphIcon />,
      [IconType.Checked]: <CheckedIcon />,
      [IconType.List]: <DropdownIcon />,
      [IconType.File]: <FileIcon />,
      [IconType.Radio]: <RadioIcon />,
      [IconType.Relation]: <RelationIcon />,
    }),
    [],
  );
  const getIconByType = useCallback(
    (type: IconType): ReactElement => {
      return ICON_HEADER[type];
    },
    [ICON_HEADER],
  );
  const styledHeader = useCallback(
    (column: number, TH: HTMLTableHeaderCellElement): void => {
      const colData = template?.fields?.fields.find(
        (item: any) => item.id === headerTable[column]?.data,
      );
      const { required: isRequired } = colData || {};
      const columnHeaderValue =
        hotRef.current?.hotInstance?.getColHeader(column);
      const valueToVisible =
        columnHeaderValue !== " " ? columnHeaderValue : "+";
      const iconType = getIconByType(colData?.type);

      TH.innerHTML = getStyledContent(iconType, valueToVisible, isRequired);
    },
    [getIconByType, headerTable, hotRef, template?.fields?.fields],
  );

  const [dropDownStatus, setDropDownStatus] = useState<IDropDownStatus>({
    type: "none",
    coordX: 0,
    coordY: 0,
    col: 0,
    invert: false,
  });

  function getMaxOrderForFrozen(arr: ICol[]): number {
    return arr.reduce((maxOrder: number, current) => {
      if (current.frozen && +current.order > maxOrder) {
        return +current.order;
      }
      return maxOrder;
    }, -Infinity);
  }

  return (
    <>
      {openAlertTooltip && <AlertTooltip setAlertTooltip={setAlertTooltip} />}

      <HotTable
        className="hot-table"
        readOnly={isTableLocked}
        ref={hotRef}
        colHeaders={colHeaders}
        columns={cols}
        data={products}
        hiddenColumns={{ columns: hidden }}
        manualColumnResize
        manualColumnMove
        rowHeaders
        rowHeights="52px"
        licenseKey="non-commercial-and-evaluation"
        fixedColumnsLeft={getMaxOrderForFrozen(cols) + 1}
        afterScrollVertically={afterScrollVerticallyCallback}
        beforeCopy={beforeCopyCallback}
        beforeOnCellMouseDown={(event) => {
          disableMultiSelectionWithControl(event, hotRef);
        }}
        afterPaste={afterPasteCallback}
        afterColumnMove={afterColumnMoveCallback}
        afterGetColHeader={styledHeader}
        afterColumnResize={async (newSize: number, column: number) => {
          await handleResize(column, newSize, template);
        }}
        afterOnCellMouseUp={(event: any, coords, _TD) => {
          const limitWidth = window.innerWidth - 350;

          const invert = event.clientX > limitWidth;

          const clickedElementClassList = event.target.classList;
          const correctElement = clickedElementClassList.contains("dropDown");
          if (colHeaders.length - 1 === coords.col) {
            setTimeout(() => {
              setDropDownStatus({
                type: "new",
                coordX: event.clientX,
                coordY: event.clientY,
                col: coords.col,
                invert,
              });
            });
            return null;
          }
          if (correctElement && coords.row === -1 && coords.col >= 0) {
            setTimeout(() => {
              setDropDownStatus({
                type: "cell",
                coordX: event.clientX,
                coordY: event.clientY,
                col: coords.col,
                invert,
              });
            }, 0);
            return null;
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
        {cols.map((col, _index: number) => {
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
          if (col.isCustom && col.type === "checked") {
            return (
              <HotColumn
                width={col.width}
                _columnIndex={+col.order}
                data={col.data}
                key={col.order + col.data}
                renderer={customRendererChecked}
              >
                <CheckBoxEditor
                  hot-editor
                  options={[...col.options]}
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
        setCurrentCell={setCurrentCell}
        setIsOpen={setIsOpen}
        handleFreeze={handleFreeze}
      />
    </>
  );
}

export default DefaultTable;
