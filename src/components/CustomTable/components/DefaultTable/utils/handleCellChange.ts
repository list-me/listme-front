import Handsontable from "handsontable";
import { isEquivalent } from "../../../../../utils";

let previousCellValue: any;

const handleCellChange: any = async (
  changes: any,
  hotInstance: Handsontable | null | undefined,
  isTableLocked: boolean,
  setIsTableLocked: React.Dispatch<React.SetStateAction<boolean>>,
  handleSave: (value: any, isNew: boolean, productId: string) => Promise<any>,
  dataProvider: any[],
  setDataProvider: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  if (changes !== null && changes.length && !isTableLocked && hotInstance) {
    const isNew = !!dataProvider[changes[0][0]].id;
    const customChanges = changes as Handsontable.CellChange[];
    if (
      typeof customChanges[0][2] === "object" &&
      typeof customChanges[0][3] === "object" &&
      !isEquivalent(customChanges[0][2], customChanges[0][3])
    ) {
      // eslint-disable-next-line prefer-destructuring
      previousCellValue = customChanges[0][2];
      try {
        if (!isNew) setIsTableLocked(true);
        const response = await handleSave(
          dataProvider[customChanges[0][0]],
          isNew,
          dataProvider[customChanges[0][0]]?.id,
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
        // eslint-disable-next-line no-param-reassign
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

      try {
        if (!isNew) setIsTableLocked(true);
        const response = await handleSave(
          dataProvider[customChanges[0][0]],
          isNew,
          dataProvider[customChanges[0][0]]?.id,
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
        // eslint-disable-next-line no-param-reassign
        dataProvider[customChanges[0][0]][customChanges[0][1]] =
          previousCellValue;

        setDataProvider([...dataProvider]);
      } finally {
        if (!isNew) setIsTableLocked(false);
      }
    }
  }
};

export default handleCellChange;
