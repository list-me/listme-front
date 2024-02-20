import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import { toast } from "react-toastify";
import Handsontable from "handsontable";
import { CellValue, RangeType } from "handsontable/common";
import { renderToString } from "react-dom/server";
import { Switch } from "antd";
import ReactDOM from "react-dom";
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
import { ReactComponent as NumericIcon } from "../../../../assets/numeric-icon.svg";
import { ReactComponent as DecimalIcon } from "../../../../assets/decimal-icon.svg";
import { ReactComponent as BooleanIcon } from "../../../../assets/boolean-icon.svg";
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
import DefaultLimits from "../../../../utils/DefaultLimits";
import ModalSelectChildrens from "../ModalSelectChildrens";
import { productRequests } from "../../../../services/apis/requests/product";
import { IProductToTable } from "../../../../context/products/product.context";
import getStyleRowHeader from "./utils/getStyleRowHeader";

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
  parentId,
  setParentId,
  subItensMode,
  setSubItemsMode,
}: IDefaultTable): JSX.Element {
  const svgStringDropDown: string = renderToString(<DropDownIcon />);
  const [openAlertTooltip, setAlertTooltip] = useState(false);
  const [openAlertTooltipIntegration, setAlertTooltipIntegration] =
    useState(false);

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
    if (changes) {
      const currentColumnId = changes[0][1];
      const newValue = changes[0][3];

      const currentColumn = cols.find((item) => item.data === currentColumnId);
      if (currentColumn?.type === "numeric") {
        if (Number.isNaN(Number(newValue))) {
          toast.warn(
            `O valor deve ser numérico para a coluna ${currentColumn?.title}`,
          );
          const previousCellValue = changes[0][2];
          // eslint-disable-next-line no-param-reassign
          products[changes[0][0]][changes[0][1]] = previousCellValue;

          setProducts([...products]);
          return;
        }
      }

      if (currentColumn?.type === "decimal") {
        if (
          newValue !== null &&
          !/^-?\d*\.?\d*$/.test(newValue?.replace(",", "."))
        ) {
          toast.warn(
            `O valor deve ser numérico para a coluna ${currentColumn?.title}`,
          );
          const previousCellValue = changes[0][2];
          // eslint-disable-next-line no-param-reassign
          products[changes[0][0]][changes[0][1]] = previousCellValue;

          setProducts([...products]);
          return;
        }
      }

      if (currentColumn?.title) {
        const limit =
          currentColumn?.limit || DefaultLimits[currentColumn?.type]?.default;

        if (currentColumn?.type !== "boolean" && newValue?.length > limit) {
          toast.warn(`Limite excedido em "${currentColumn?.title}"`);
          return;
        }

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
            currentColumn?.type,
          );
        }
      }
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

        const colType = columns[col]?.type;
        const maxLength = columns[col]?.limit || DefaultLimits[colType]?.max;

        td.style.border = "";
        if (value?.length > maxLength) {
          td.style.border = "2px solid #F1BC02";
        }
      }
    },
    [columns, svgStringDropDown],
  );

  const customRendererFileCallBack = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      col: number,
      prop: string | number,
      value: any,
    ) => {
      const colType = columns[col]?.type;
      const maxLength = columns[col]?.limit || DefaultLimits[colType]?.max;
      const previousValue = _instance.getDataAtCell(_row, col);

      customRendererFile(
        _instance,
        td,
        _row,
        col,
        prop,
        value,
        hotRef,
        loadingRef,
        uploadImages,
        template,
        previousValue?.length,
        maxLength,
      );

      td.style.border = "";
      if (value?.length > maxLength) {
        td.style.border = "2px solid #F1BC02";
      }
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
  const customRendererText = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      col: number,
      _prop: string | number,
      value: string | string[],
    ): void => {
      const colType = cols[col].type;
      const maxLength = cols[col].limit || DefaultLimits[colType].max;
      const textValue = value as string;

      td.style.border = "";

      if (textValue?.length > maxLength) {
        td.style.border = "2px solid #F1BC02";
      }

      td.innerHTML = textValue;
    },
    [cols, svgStringDropDown],
  );

  const customRendererNumeric = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      col: number,
      _prop: string | number,
      value: string | string[],
    ): void => {
      const numericValue = value as string;
      const previousValue = _instance.getDataAtCell(_row, col);
      const colType = columns[col]?.type;
      const maxLength = columns[col]?.limit || DefaultLimits[colType]?.max;

      td.style.border = "";
      if (value?.length > maxLength) {
        td.style.border = "2px solid #F1BC02";
      }

      if (Number.isNaN(Number(numericValue))) {
        td.innerHTML =
          previousValue !== null && previousValue !== undefined
            ? String(previousValue)
            : "";
      } else {
        td.innerHTML = numericValue;
      }
    },
    [svgStringDropDown],
  );

  const customRendererDecimal = useCallback(
    (
      _instance: Handsontable,
      td: HTMLTableCellElement,
      _row: number,
      col: number,
      _prop: string | number,
      value: string | string[],
    ): void => {
      const colDecimalPoint =
        (cols[col]?.options && cols[col]?.options[0]) || ".";

      let numericValue = "";
      const colType = columns[col]?.type;
      const maxLength = columns[col]?.limit || DefaultLimits[colType]?.max;
      td.style.border = "";
      if (value?.length > maxLength) {
        td.style.border = "2px solid #F1BC02";
      }

      if (typeof value === "string") {
        numericValue = value;
      } else if (
        Array.isArray(value) &&
        value.length > 0 &&
        typeof value[0] === "string"
      ) {
        // eslint-disable-next-line prefer-destructuring
        numericValue = value[0];
      }

      const replacedValue = numericValue.replace(/[.,]/g, colDecimalPoint);

      td.innerHTML = replacedValue;
    },
    [svgStringDropDown, cols],
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
      if (typeof value === "string" && value?.length && value?.includes("["))
        // eslint-disable-next-line no-param-reassign
        value = JSON?.parse(value);

      const totalItems = value ? value?.length : 0;
      td.innerHTML = `<div class="tag-content">${totalItems} Items relacionados</div>`;
    },
    [],
  );

  const customRendererBoolean = useCallback(
    (
      instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      col: number,
      prop: string | number,
      value: any,
    ): void => {
      const handleChange = (checked: boolean): void => {
        const newValue = [`${checked}`];
        instance.setDataAtCell(row, col, newValue);
      };

      const switchContainer = document.createElement("div");
      switchContainer.classList.add("boolean-switch-cell");

      ReactDOM.render(
        <Switch
          checked={value?.length > 0 && value[0] === "true"}
          onChange={handleChange}
        />,
        switchContainer,
      );

      while (td.firstChild) {
        td.removeChild(td.firstChild);
      }

      td.appendChild(switchContainer);
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
      [IconType.Numeric]: <NumericIcon />,
      [IconType.Decimal]: <DecimalIcon />,
      [IconType.Boolean]: <BooleanIcon />,
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

      TH.innerHTML = getStyledContent(
        iconType,
        valueToVisible,
        isRequired,
        colData,
      );
    },
    [getIconByType, headerTable, hotRef, template?.fields?.fields],
  );

  const [hiddenRows, setHiddenRows] = useState<number[]>([]);
  const [isOpenedParentIds, setIsOpenedParentIds] = useState<string[]>([]);

  const handleRowHeaderClick = useCallback(
    (currentParentId: string, currentProducts: IProductToTable[]): void => {
      const isOpened = isOpenedParentIds.includes(currentParentId);
      const childIndices = currentProducts
        .map((product, index) => ({ item: product, index }))
        .filter(({ item }) => item?.parent_id === currentParentId)
        .map(({ index }) => index);

      setIsOpenedParentIds(
        isOpened
          ? isOpenedParentIds.filter((id) => id !== currentParentId)
          : [...isOpenedParentIds, currentParentId],
      );
      setHiddenRows(
        isOpened
          ? hiddenRows.filter((rowIndex) => !childIndices.includes(rowIndex))
          : [...hiddenRows, ...childIndices],
      );
    },
    [hiddenRows, isOpenedParentIds],
  );

  const styledRow = useCallback(
    (row: number, TH: HTMLTableHeaderCellElement): void => {
      const currentProduct = products[row];
      const onClickHandler = (currentParentId: string): void => {
        handleRowHeaderClick(currentParentId, products);
      };

      const opened = isOpenedParentIds.includes(currentProduct?.id);
      TH.innerHTML = getStyleRowHeader(
        row,
        currentProduct,
        onClickHandler,
        opened,
      );
    },
    [handleRowHeaderClick],
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

  const [rowsSelectedPosition, setRowsSelectedPosition] = useState<string[]>(
    [],
  );
  const [childsSelectedIds, setChildsSelectedIds] = useState<string[]>([]);

  const clearSubItensMode = (): void => {
    setChildsSelectedIds([]);
    setRowsSelectedPosition([]);
    setParentId(null);
  };

  const toggleRowSelection = useCallback(
    (row: string) => {
      const isSelected = rowsSelectedPosition.includes(row);
      const updatedSelection = isSelected
        ? rowsSelectedPosition.filter((selectedRow) => selectedRow !== row)
        : rowsSelectedPosition.concat(row);

      setRowsSelectedPosition(updatedSelection);
      const idsSelecteds = updatedSelection.map((updatedItem: any) => {
        return products[+updatedItem].id;
      });
      setChildsSelectedIds(idsSelecteds);
    },
    [products, rowsSelectedPosition],
  );

  const customCheckboxRenderer = useCallback(
    (
      instance: Handsontable,
      td: HTMLTableCellElement,
      row: number,
      _col: number,
      _prop: string | number,
      _value: any,
    ) => {
      const stringRow = String(row);

      const isChecked = rowsSelectedPosition?.includes(stringRow);

      const checkboxContainer = document.createElement("div");
      checkboxContainer.style.width = "100%";
      checkboxContainer.style.height = "50px";
      checkboxContainer.style.display = "flex";
      checkboxContainer.style.alignItems = "center";
      checkboxContainer.style.justifyContent = "center";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = isChecked || false;

      if (products[row]?.id === parentId) {
        checkbox.disabled = true;
      }
      if (subItensMode === "add" && products[row]?.parent_id === parentId) {
        checkbox.disabled = true;
      }
      if (subItensMode === "remove" && products[row]?.parent_id !== parentId) {
        checkbox.disabled = true;
      }

      checkbox.addEventListener("change", () => {
        toggleRowSelection(stringRow);
      });
      checkboxContainer.addEventListener("click", () => {
        if (!checkbox.disabled) toggleRowSelection(stringRow);
      });

      checkboxContainer.appendChild(checkbox);

      td.innerHTML = "";

      td.appendChild(checkboxContainer);
    },
    [products, rowsSelectedPosition, parentId, toggleRowSelection],
  );
  const { handleRedirectAndGetProducts } = useProductContext();

  const [contentTooltipIntegration, setContentTooltipIntegration] = useState([
    {
      provider: "",
      entities: [""],
    },
  ]);

  const onFinishProductChild = async (): Promise<void> => {
    if (parentId) {
      try {
        if (subItensMode === "add") {
          const body = {
            product_id: parentId,
            childs: childsSelectedIds,
          };
          await productRequests.postProductChildren(body);
          toast.success("Subitems adicionados com sucesso");
          clearSubItensMode();
        } else {
          await productRequests.deleteProductChildren({
            parent_id: parentId,
            childs: childsSelectedIds,
          });
          toast.success("Subitems removidos com sucesso");
          clearSubItensMode();
        }
        const id = window.location.pathname.substring(10);
        if (id) {
          handleRedirectAndGetProducts(id);
        }
      } catch (error) {
        console.error(error);
        toast.error(
          `Não foi possível ${
            subItensMode === "add" ? "adicionar" : "remover"
          } os subitems, tente novamente!`,
        );
      }
    }
  };
  return (
    <>
      {openAlertTooltip && (
        <AlertTooltip setAlertTooltip={setAlertTooltip}>
          <p className="error-title">Inválido:</p>
          <p>
            A entrada não é aceitável, pois não
            <br />
            corresponde a nenhum dos itens da
            <br />
            coluna especificada.
          </p>
        </AlertTooltip>
      )}
      {openAlertTooltipIntegration && (
        <AlertTooltip setAlertTooltip={setAlertTooltipIntegration}>
          <p>
            Esse campo é obrigatório com as seguintes integrações:
            {contentTooltipIntegration.map((itemTool) => (
              <>
                <br />
                <>
                  {itemTool.provider}:{" "}
                  {itemTool.entities.map((entity) => (
                    <>{entity}, </>
                  ))}
                </>
              </>
            ))}
          </p>
        </AlertTooltip>
      )}

      <HotTable
        key={parentId + subItensMode}
        nestedRows
        bindRowsWithHeaders
        className="hot-table"
        readOnly={!!parentId || isTableLocked}
        ref={hotRef}
        colHeaders={colHeaders}
        columns={cols}
        data={products}
        hiddenRows={{
          rows: hiddenRows,
          indicators: false,
        }}
        hiddenColumns={{ columns: hidden }}
        manualColumnResize
        manualColumnMove
        rowHeaders={!parentId}
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
        afterGetRowHeader={styledRow}
        afterColumnResize={async (newSize: number, column: number) => {
          if (!parentId) await handleResize(column, newSize, template);
        }}
        // afterOnCellMouseDown={(event: any) => {
        //   const clickedElementClassList = event.target.classList;
        // }}
        afterOnCellMouseUp={(event: any, coords, _TD) => {
          const limitWidth = window.innerWidth - 350;
          setContentTooltipIntegration(cols[coords?.col]?.integrations);

          const invert = event.clientX > limitWidth;

          const clickedElementClassList = event.target.classList;
          const correctElement = clickedElementClassList.contains("dropDown");

          const correctElementIntegration = clickedElementClassList.contains(
            "REQUIRED_INTEGRATION_BUTTON",
          );

          if (correctElementIntegration) {
            setAlertTooltipIntegration(true);
          }

          if (!parentId && colHeaders.length - 1 === coords.col) {
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
          if (products[row].parent_id) {
            TD.style.background = "#F1F3F5";
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
            subItems_row: {
              name: "Vincular variações",
              callback(key, selection) {
                const selectedRow = selection[0].start.row;
                const selectedProduct = products[selectedRow];
                if (selectedProduct && !selectedProduct.parent_id) {
                  setChildsSelectedIds([]);
                  setRowsSelectedPosition([]);
                  setSubItemsMode("add");
                  setParentId(selectedProduct.id as any);
                } else {
                  toast.warn("Este produto não pode ter subitens");
                }
              },
            },
            subItems_row_remove: {
              name: "Desvincular variação",
              callback(key, selection) {
                const selectedRow = selection[0].start.row;
                const selectedProduct = products[selectedRow];
                if (selectedProduct && selectedProduct.parent_id) {
                  clearSubItensMode();
                  setSubItemsMode("remove");
                  setParentId(selectedProduct.parent_id as any);
                } else {
                  toast.warn("Este produto não é um subitem");
                }
              },
            },
          },
        }}
        afterChange={afterChangeCallback}
      >
        {cols.map((col, _index: number) => {
          if (col.type === "checkSubItem") {
            return <HotColumn width={50} renderer={customCheckboxRenderer} />;
          }
          if (col?.type === "text" || col?.type === "paragraph") {
            return (
              <HotColumn
                width={col.width}
                _columnIndex={+col.order}
                data={col.data}
                key={col.order + col.data}
                renderer={customRendererText}
              />
            );
          }
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
                  hotRef={hotRef}
                  template={template}
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
          if (col.type === "boolean") {
            return (
              <HotColumn
                _columnIndex={+col.order}
                data={col.data}
                width={col.width}
                key={col.order + col.data}
                // eslint-disable-next-line react/jsx-no-bind
                renderer={customRendererBoolean}
                readOnly
              />
            );
          }

          if (col.type === "numeric") {
            return (
              <HotColumn
                width={col.width}
                _columnIndex={+col.order}
                data={col.data}
                key={col.order + col.data}
                renderer={customRendererNumeric}
              />
            );
          }
          if (col.type === "decimal") {
            return (
              <HotColumn
                width={col.width}
                _columnIndex={+col.order}
                data={col.data}
                key={col.order + col.data}
                renderer={customRendererDecimal}
              />
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
      {parentId && (
        <ModalSelectChildrens
          amount={childsSelectedIds.length}
          clearSubItensMode={clearSubItensMode}
          onFinishProductChild={onFinishProductChild}
        />
      )}
    </>
  );
}

export default DefaultTable;
