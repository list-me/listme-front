/* eslint-disable no-param-reassign */
import { HotTable } from "@handsontable/react";
import { ReactElement } from "react";
import { IHeaderTable } from "../../../../../context/products/product.context";
import { IconType } from "../../../../Cell/Cell";
import getStyledContent from "./getStyledContent";
import generateColorArray from "./generateColorArray";
import { ICol } from "../../../CustomTable";

function customStyledHeader(
  TH: HTMLTableHeaderCellElement,
  groups: {
    label: string;
    colspan: number;
    newHiddens: number[];
  }[],
  setParentHeaderSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
  template: any,
  headerTable: IHeaderTable[],
  column: number,
  hotRef: React.RefObject<HotTable>,
  getIconByType: (type: IconType) => ReactElement,
  cols: ICol[],
  svgStringConfigHeaderGroup: string,
  svgArrowRightHeaderGroup: string,
  editModeGroup: "group" | "ungroup" | "",
  idsColumnsSelecteds: string[],
  setIdsColumnsSelecteds: React.Dispatch<React.SetStateAction<string[]>>,
  handleRedirectAndGetProducts: (template: any) => Promise<any>,
  groupReferenceEditMode: string,
  setHidden: any,
  setGroups: any,
  changeAllRowsSelected: () => void,
  allRowsSelected: boolean | undefined,
  isPublic: boolean | undefined,
  setEditModeGroup: React.Dispatch<
    React.SetStateAction<"" | "group" | "ungroup">
  >,
): void {
  const spanContent = TH.querySelector("span")?.textContent;
  const groupsName = groups.map((group: any) => group.label);

  function selectParentHeader(): void {
    groupsName.forEach((itemGname, index) => {
      if (itemGname === spanContent) {
        setParentHeaderSelectedIndex(index + 1);
      }
    });
  }

  if (spanContent === "+ Criar novo grupo") {
    TH.innerHTML = !isPublic
      ? `
        <div class='newGroupHeader'>
          <span>${spanContent}</span>
        </div>`
      : "";

    const configSvgDiv = TH.querySelector(".newGroupHeader");
    configSvgDiv?.addEventListener("click", () => setEditModeGroup("group"));

    return;
  }

  if (spanContent && !groupsName.includes(spanContent)) {
    const colData = template?.fields?.fields.find(
      (item: any) => item.id === headerTable[column]?.data,
    );
    const { required: isRequired } = colData || {};
    const columnHeaderValue = hotRef.current?.hotInstance?.getColHeader(column);
    const valueToVisible = columnHeaderValue !== " " ? columnHeaderValue : "+";
    const iconType = getIconByType(colData?.type);

    TH.innerHTML = getStyledContent(
      iconType,
      valueToVisible as string,
      isRequired,
      colData,
      editModeGroup,
      idsColumnsSelecteds,
      groupReferenceEditMode,
      changeAllRowsSelected,
      allRowsSelected,
    );

    const addOrRemoveStringFromArray = (
      array: string[],
      string: string,
      setArray: React.Dispatch<React.SetStateAction<string[]>>,
    ): void => {
      const arrayCopy = [...array];

      const index = arrayCopy.indexOf(string);
      if (index === -1) {
        arrayCopy.push(string);
      } else {
        arrayCopy.splice(index, 1);
      }
      setArray(arrayCopy);
    };

    const configSvgDiv = TH.querySelector(".checkGroup");
    configSvgDiv?.addEventListener("click", () =>
      addOrRemoveStringFromArray(
        idsColumnsSelecteds,
        colData?.id,
        setIdsColumnsSelecteds,
      ),
    );
  } else if (spanContent && groupsName.includes(spanContent)) {
    const colors = generateColorArray(cols.length);
    const indexColor = groupsName.indexOf(spanContent);

    const containerGroupStyle = `
          cursor: pointer;
          border: none;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 14px;
          background-color: ${colors[indexColor]};
          height: 20px;
          border-radius: 5px 5px 0px 0px;
        `;
    const configSvg = `
          padding-left: 4px;
          height: 16px !important;
          display: flex;
          border-left: 1px solid rgba(0, 0, 0, 0.2);
          align-items: center;
        `;
    const configSvg2 = `
          padding: 0 10px;
          height: 16px !important;
          display: flex;
          border-left: 1px solid rgba(0, 0, 0, 0.2);
          align-items: center;
        `;
    const divSvgs = `
         display: flex;
         height: 100%;
         align-items: center;
         gap: 12px;
         margin-right: 4px;
        `;
    TH.className = "style-th-group";

    const currentCols = cols.filter((item) => item.group === spanContent);
    const indexes = currentCols.map((item) => cols.indexOf(item));

    TH.innerHTML = `<div style="${containerGroupStyle}" class='groupHeader'>
        <div></div>
        <span>${spanContent}</span>
        <div style="${divSvgs}" class='buttonsGroupHeader'>
        <div class="configSvgDiv" style="${configSvg}">${svgStringConfigHeaderGroup}</div>
        ${
          currentCols.length > 1
            ? `<div class="collapseIconGroup" style="${configSvg2}">
            ${svgArrowRightHeaderGroup}
          </div>`
            : ""
        }
        </div>
        </div>`;

    const configSvgDiv = TH.querySelector(".configSvgDiv");
    configSvgDiv?.addEventListener("click", selectParentHeader);
    const collapseDiv = TH.querySelector(".collapseIconGroup");
    collapseDiv?.addEventListener("click", () => {
      const index = groups.findIndex(
        (group) => group.label === spanContent && group?.newHiddens?.length > 0,
      );
      const currentObjectWithHiddens = groups[index];
      if (currentObjectWithHiddens?.label) {
        const filtered = groups.filter(
          (group) => group.label !== currentObjectWithHiddens.label,
        );
        // @ts-ignore
        filtered.splice(index, 0, {
          label: currentObjectWithHiddens.label,
          colspan: currentObjectWithHiddens.newHiddens.length + 1,
        });
        setGroups(filtered);
      }
      if (!currentObjectWithHiddens?.label) {
        indexes.shift();
        const countHiddens = 0;
        const newGroups = groups.map((group) => {
          if (group.label === spanContent) {
            return [
              { ...group, colspan: 1, newHiddens: indexes },
              ...Array.from({ length: group.colspan - 1 }, () => ({
                label: group.label,
                colspan: 1,
              })),
            ];
          }
          return group;
        });
        setGroups(() =>
          countHiddens > 0
            ? [
                ...newGroups,
                { label: spanContent, colspan: countHiddens },
              ].flat()
            : [...newGroups.flat()],
        );
      }
    });
  }
}

export default customStyledHeader;
