/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { HotTable } from "@handsontable/react";
import { CellValue, RangeType } from "handsontable/common";
import { IColumnsCustom } from "../../../../TableTest/TableTest";

const handleBeforeCopy = (
  data: CellValue[][],
  coords: RangeType[],
  hotRef: React.RefObject<HotTable>,
  cols: IColumnsCustom | undefined,
): void => {
  if (cols) {
    for (let i = 0; i < coords.length; i++) {
      const { startRow, startCol, endRow, endCol } = coords[i];
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          const cellData = hotRef.current!.hotInstance?.getDataAtCell(row, col);
          const cell = hotRef.current!?.hotInstance?.getCellMeta(row, col);
          const column = cols.find((colItem) => colItem.data === cell?.prop);
          if (
            column &&
            cellData &&
            ["relation", "file", "checked"].includes(column.type)
          ) {
            data[row - startRow][col - startCol] = JSON.stringify(cellData);
          }
        }
      }
    }
  }
};

export default handleBeforeCopy;
