import Handsontable from "handsontable";

const handleCellChange = async (
  changes: Handsontable.CellChange[] | null,
  hotInstance: Handsontable | null,
  isTableLocked: boolean,
  setIsTableLocked: React.Dispatch<React.SetStateAction<boolean>>,
  handleSave: any,
  dataProvider: Object[],
  setDataProvider: React.Dispatch<React.SetStateAction<Object[]>>,
): Promise<void> => {
  if (changes) {
    if (!changes.length || isTableLocked || !hotInstance) return;

    const customChanges = changes[0];
    // @ts-ignore
    const isNew = !!dataProvider[customChanges[0]].id;

    try {
      if (!isNew) setIsTableLocked(true);

      const id = await handleSave(
        dataProvider[customChanges[0]],
        isNew,
        // @ts-ignore
        dataProvider[customChanges[0]]?.id,
      );

      if (
        id &&
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
          id.toString(),
        )
      ) {
        const updated = [...dataProvider]; // Create a shallow copy
        // @ts-ignore
        updated[customChanges[0]].id = id;
        setDataProvider(updated);
      }
    } finally {
      if (!isNew) setIsTableLocked(false);
      console.log("BF");
    }
  }
};

export default handleCellChange;
