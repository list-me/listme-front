/* eslint-disable no-param-reassign */
import { HotTable } from "@handsontable/react";
import { ReactElement } from "react";
import { IHeaderTable } from "../../../../../context/products/product.context";
import { IconType } from "../../../../Cell/Cell";
import getStyledContent from "./getStyledContent";
import generateColorArray from "./generateColorArray";
import { ICol } from "../../../CustomTable";

async function createNewGroup(
  cols: ICol[],
  currentColumnIndex: number,
  template: any,
): Promise<void> {
  const currentColumn = cols[currentColumnIndex];
  let templateUpdated = [];

  templateUpdated = template.fields.fields.map((field: any) => {
    if (field.id === currentColumn.data) {
      field.group = `Novo grupo #${currentColumn.data}`;
      return field;
    }

    return field;
  });

  const newTemplates = {
    fields: templateUpdated,
    groups: [
      ...template.fields.groups,
      { label: `Novo grupo #${currentColumn.data}`, total: 1 },
    ],
  };
  console.log("🚀 ~ newTemplates:", newTemplates);
}

function customStyledHeader(
  TH: HTMLTableHeaderCellElement,
  groups: {
    label: string;
    colspan: number;
  }[],
  setParentHeaderSelectedIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >,
  template: any,
  headerTable: IHeaderTable[],
  column: number,
  hotRef: React.RefObject<HotTable>,
  getIconByType: (type: IconType) => ReactElement,
  cols: ICol[],
  svgStringConfigHeaderGroup: string,
  svgArrowRightHeaderGroup: string,
  editModeGroup: boolean,
  idsColumnsSelecteds: string[],
  setIdsColumnsSelecteds: React.Dispatch<React.SetStateAction<string[]>>,
): void {
  // console.log("🚀 ~ cols:", cols);
  // console.log("🚀 ~ headerTable:", headerTable);
  const spanContent = TH.querySelector("span")?.textContent;

  const groupsName = groups.map((group: any) => group.label);

  function selectParentHeader(): void {
    groupsName.forEach((itemGname, index) => {
      if (itemGname === spanContent) {
        setParentHeaderSelectedIndex(index);
      }
    });
  }

  if (spanContent === "+ Criar novo grupo") {
    TH.innerHTML = `
        <div class='newGroupHeader'>
          <span>${spanContent}</span>
        </div>`;

    const configSvgDiv = TH.querySelector(".newGroupHeader");
    configSvgDiv?.addEventListener("click", () =>
      createNewGroup(cols, column, template),
    );

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
          justify-content: space-between;
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
    const divSvgs = `
         display: flex;
         height: 100%;
         align-items: center;
         gap: 12px;
         margin-right: 4px;
        `;
    TH.className = "style-th-group";

    TH.innerHTML = `<div style="${containerGroupStyle}">
        <div></div>
        <span>${spanContent}</span>
        <div style="${divSvgs}">
          <div class="configSvgDiv">${svgStringConfigHeaderGroup}</div>
          <div style="${configSvg}">${svgArrowRightHeaderGroup}</div>
        </div>
      </div>`;

    const configSvgDiv = TH.querySelector(".configSvgDiv");
    configSvgDiv?.addEventListener("click", selectParentHeader);
  }
}

export default customStyledHeader;
