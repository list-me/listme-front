import { useEffect, useRef } from "react";
import { HotTable } from "@handsontable/react";
import { toast } from "react-toastify";
import { IDropDownStatus } from "./HeaderDropDown";
import { BoxDropDown, ContainerHeaderDropDown } from "./styles";
import {
  IHeader,
  IHeaderTable,
  ITemplate,
} from "../../../../context/products/product.context";
import { NewColumn } from "./components/NewColumn";
import { Cell } from "./components/Cell";

function HeaderDropDown({
  dropDownStatus,
  setDropDownStatus,
  template,
  columns,
  setColumns,
  colHeaders,
  setColHeaders,
  handleNewColumn,
  handleHidden,
  headerTable,
  setCurrentCell,
  setIsOpen,
  handleFreeze,
  setEditModeGroup,
  setGroupReferenceEditMode,
}: {
  dropDownStatus: IDropDownStatus;
  setDropDownStatus: React.Dispatch<React.SetStateAction<IDropDownStatus>>;
  template: ITemplate;
  columns: IHeader[];
  setColumns: React.Dispatch<React.SetStateAction<IHeader[]>>;
  colHeaders: string[];
  setColHeaders: React.Dispatch<React.SetStateAction<string[]>>;
  handleNewColumn: Function;
  handleHidden: Function;
  headerTable: IHeaderTable[];
  setCurrentCell: React.Dispatch<any>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFreeze: any;
  setEditModeGroup: React.Dispatch<
    React.SetStateAction<"group" | "ungroup" | "">
  >;
  setGroupReferenceEditMode: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element | null {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const clickedElement = document.elementFromPoint(
        event.clientX,
        event.clientY,
      );

      if (dropdownRef.current && dropdownRef.current.contains(clickedElement)) {
        return;
      }

      let node = clickedElement;

      while (node && node !== document.body) {
        if (
          node instanceof HTMLElement &&
          (node.classList.contains("ant-modal") ||
            node.classList.contains("ant-select-dropdown"))
        ) {
          return;
        }
        node = node.parentNode as Element | null;
      }

      if (dropDownStatus.type !== "none") {
        setDropDownStatus({
          type: "none",
          coordX: 0,
          coordY: 0,
          col: 0,
          invert: false,
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownStatus.type, setDropDownStatus]);

  let colIndex;
  const col = template?.fields?.fields.find((item, index) => {
    if (item.id === columns[dropDownStatus.col]?.data) {
      colIndex = index;
      return item;
    }
  });
  const collToCell = { ...col, order: col?.order || `${colIndex}` };

  if (dropDownStatus.type === "cell")
    return (
      <ContainerHeaderDropDown>
        <BoxDropDown
          top={dropDownStatus.coordY}
          left={dropDownStatus.coordX}
          ref={dropdownRef}
          invert={dropDownStatus.invert}
        >
          <Cell
            label={colHeaders[dropDownStatus.col]}
            column={collToCell}
            template={template}
            handleHidden={() => {
              handleHidden(dropDownStatus.col, template, true);
            }}
            handleFrozen={handleFreeze}
            freeze={!!headerTable[dropDownStatus.col]?.frozen}
            handleSort={() => {}}
            handleDeleteColumn={() => {
              col!.order = +dropDownStatus.col.toString();
              setCurrentCell(() => col);
              setIsOpen((prev) => !prev);
            }}
            handleGroupEdit={() => {
              if (col?.group) {
                setGroupReferenceEditMode(col.group);
                setEditModeGroup("ungroup");
              } else {
                setEditModeGroup("group");
              }
            }}
          />
        </BoxDropDown>
      </ContainerHeaderDropDown>
    );
  if (dropDownStatus.type === "new")
    return (
      <ContainerHeaderDropDown>
        <BoxDropDown
          top={dropDownStatus.coordY}
          left={dropDownStatus.coordX}
          ref={dropdownRef}
          invert={dropDownStatus.invert}
        >
          <NewColumn
            template={template}
            setNewColumn={(newColumn: any, templateUpdated: any) => {
              newColumn = {
                ...newColumn,
                className: "htLeft htMiddle",
                frozen: false,
                hidden: false,
                order: String(columns.length + 1),
                width: "300",
              };

              const newPosition = [...columns, newColumn];
              newPosition.splice(newPosition.length - 2, 1);
              newPosition.push({});
              setColumns(newPosition);

              const contentHeaders = columns.map((item) => item?.title);
              contentHeaders.splice(columns.length - 1, 1);
              contentHeaders.push(newColumn?.title);
              contentHeaders.push(" ");
              setColHeaders(contentHeaders);
              handleNewColumn(newColumn, templateUpdated);
            }}
          />
        </BoxDropDown>
      </ContainerHeaderDropDown>
    );
  return null;
}

export default HeaderDropDown;
