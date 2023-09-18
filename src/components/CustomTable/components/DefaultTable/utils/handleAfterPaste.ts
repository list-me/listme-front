/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

import { CellValue, RangeType } from "handsontable/common";
import { HotTable } from "@handsontable/react";
import { ICustomCellType } from "../../../../../context/products/product.context";
import { generateUUID } from "../../../../../utils";
import { IColumnsCustom } from "../../../../TableTest/TableTest";
import { IBuildProductFields } from "../../../../../context/Teste/test.context";

const getRowsInterval = (start: number, end: number): Array<number> => {
  if (start > end) {
    [start, end] = [end, start];
  }

  const result: Array<number> = [];
  for (let i: number = start; i <= end; i++) {
    result.push(i);
  }

  return result;
};

const handleAfterPaste: any = async (
  data: CellValue[][],
  coords: RangeType[],
  hotRef: React.RefObject<HotTable>,
  isTableLocked: boolean,
  loadingRef: React.RefObject<HTMLDivElement>,
  cols: IColumnsCustom | undefined,
  dataProvider: Object[],
  componentCellPerType: ICustomCellType,
  handleSave: (
    value: IBuildProductFields,
    isNew: boolean,
    productId: string,
  ) => Promise<void>,
) => {
  const { hotInstance } = hotRef.current!;
  if (cols && data.length && !isTableLocked && hotInstance) {
    loadingRef.current!.style.display = "block";

    const range = coords[0];
    const fieldColumns = cols
      .slice(range.startCol, range.endCol + 1)
      .map((column) => {
        return { field: column.data, type: column.type };
      });

    const rangeOfRows: number = range.endRow - range.startRow + 1;
    const rows: number[] = getRowsInterval(range.startRow, range.endRow);

    const changesPromises = [];
    for (let i = 0; rangeOfRows > i; i++) {
      const row: number = rows[i];
      const changes: { [key: string]: string } = dataProvider[row] as {
        [key: string]: string;
      };

      fieldColumns.forEach((column, index: number): void => {
        const position: number = data.length > 1 ? i : 0;

        if (
          ["relation", "file", "checked"].includes(column.type) &&
          data[position][index]
        ) {
          changes[column.field] = JSON.parse(data[position][index]);
        } else {
          let value = Object.keys(componentCellPerType).includes(
            column.type.toString().toUpperCase(),
          )
            ? [data[position][index]]
            : data[position][index];

          if (Array.isArray(value) && value[0] === "") {
            value = [];
          }
          changes[column.field] = value;
        }
      });

      changesPromises.push(changes);
    }

    for await (const item of changesPromises) {
      const isNew: boolean = !!item?.id;
      if (!isNew) item.id = item?.id ?? generateUUID();

      await handleSave(item as IBuildProductFields, isNew, item.id);
    }

    loadingRef.current!.style.display = "none";

    if (hotInstance) {
      hotInstance.render();
    }
  }
};

export default handleAfterPaste;
