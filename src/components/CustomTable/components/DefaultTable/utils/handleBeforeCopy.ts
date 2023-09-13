/* eslint-disable no-param-reassign */
import { HotTable } from "@handsontable/react";
import { CellValue, RangeType } from "handsontable/common";

/* eslint-disable no-plusplus */
const handleBeforeCopy: any = (
  data: CellValue[][],
  coords: RangeType[],
  hotRef: React.RefObject<HotTable>,
  cols: any[],
) => {
  for (let i = 0; i < coords.length; i++) {
    const { startRow, startCol, endRow, endCol } = coords[i];
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const cellData = hotRef.current!.hotInstance?.getDataAtCell(row, col);
        const cell = hotRef.current!?.hotInstance?.getCellMeta(row, col);
        const column = cols.find((colItem) => colItem.data === cell?.prop);
        if (cellData && ["relation", "file", "checked"].includes(column.type)) {
          data[row - startRow][col - startCol] = JSON.stringify(cellData);
        }
      }
    }
  }
};

export default handleBeforeCopy;
