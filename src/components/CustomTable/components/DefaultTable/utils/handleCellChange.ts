import Handsontable from "handsontable";
import { isEquivalent } from "../../../../../utils";

let previousCellValue: any;

const handleCellChange: any = async (
  changes: any,
  hotInstance: Handsontable | null | undefined,
  isTableLocked: boolean,
  setIsTableLocked: React.Dispatch<React.SetStateAction<boolean>>,
  handleSave: (
    value: any,
    isNew: boolean,
    productId: string,
    fieldId: string,
    newValue: string,
    prevValue?: string,
    type?: string,
  ) => Promise<any>,
  dataProvider: any[],
  setDataProvider: React.Dispatch<React.SetStateAction<any[]>>,
  type: string,
) => {
  if (changes !== null && changes.length && !isTableLocked && hotInstance) {
    if (changes[0][2] === undefined && changes[0][3].length === 0) {
      return;
    }
    const isNew = !!dataProvider[changes[0][0]].id;
    const customChanges = changes as Handsontable.CellChange[];

    if (
      typeof customChanges[0][2] === "object" &&
      typeof customChanges[0][3] === "object" &&
      !isEquivalent(customChanges[0][2], customChanges[0][3])
    ) {
      const regex = /src=\"([^\"]*)\"/;

      // eslint-disable-next-line prefer-destructuring
      previousCellValue = customChanges[0][2];

      const newValue = () => {
        console.log("aqui1");
        if (type === "radio" || type === "checked" || type === "list") {
          return customChanges[0][3][0];
        }
        if (type === "file") {
          return customChanges[0][3]
            ? customChanges[0][3].map((mItem: string) => {
                return mItem.replace(/^https:\/\/[^/]+\//, "");
              })
            : customChanges[0][3];
        }

        return customChanges[0][3];
      };
      const preValueToSave =
        type !== "file"
          ? customChanges[0][2]
          : customChanges[0][2]
              ?.map((string: string) => {
                const match = string.match(regex);
                if (match) {
                  return match[1];
                }
                return null;
              })
              .filter((value: any) => value !== null);
      try {
        if (!isNew) setIsTableLocked(true);
        const response = await handleSave(
          dataProvider[customChanges[0][0]],
          isNew,
          dataProvider[customChanges[0][0]]?.id,
          customChanges[0][1] as string,
          newValue(),
          preValueToSave as string,
          type,
        );
        if (
          response.id &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            response.id.toString(),
          )
        ) {
          const updated = dataProvider;
          updated[customChanges[0][0]].id = response.id;
          setDataProvider(updated);
        }
      } catch {
        // @ts-ignore
        dataProvider[customChanges[0][0]][customChanges[0][1]] =
          previousCellValue;

        setDataProvider([...dataProvider]);
      } finally {
        if (!isNew) setIsTableLocked(false);
        console.log("BF");
      }
    }
    if (
      typeof customChanges[0][2] !== "object" &&
      customChanges[0][2] !== customChanges[0][3] &&
      dataProvider.length
    ) {
      // eslint-disable-next-line prefer-destructuring
      previousCellValue = customChanges[0][2];

      let newDataProvider = [...dataProvider];
      if (type === "decimal") {
        const newData = newDataProvider.map((item) => {
          // eslint-disable-next-line prefer-destructuring, no-multi-assign
          const columnIndex = changes[0][1];

          if (item[columnIndex]?.includes(",")) {
            item[columnIndex] = item[columnIndex].split(",").join(".");
          }
          return item;
        });
        newDataProvider = newData;
      }

      try {
        if (!isNew) setIsTableLocked(true);
        const newValue = () => {
          if (type === "radio" || type === "checked" || type === "list") {
            return customChanges[0][3][0];
          }
          if (type === "file") {
            return customChanges[0][3]
              ? customChanges[0][3].map((mItem: string) => {
                  return mItem.replace(/^https:\/\/[^/]+\//, "");
                })
              : customChanges[0][3];
          }
          return customChanges[0][3];
        };
        const response = await handleSave(
          newDataProvider[customChanges[0][0]],
          isNew,
          newDataProvider[customChanges[0][0]]?.id,
          customChanges[0][1] as string,
          newValue(),
          previousCellValue as string,
          type,
        );
        if (
          response.id &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            response.id.toString(),
          )
        ) {
          console.log("entrou no if");
          const updated = newDataProvider;
          updated[customChanges[0][0]].id = response.id;
          setDataProvider(updated);
        }
      } catch {
        // eslint-disable-next-line no-param-reassign
        newDataProvider[customChanges[0][0]][customChanges[0][1]] =
          previousCellValue;

        setDataProvider([...dataProvider]);
      } finally {
        if (!isNew) setIsTableLocked(false);
      }
    }
  }
};

export default handleCellChange;
