import Handsontable from "handsontable";
import { isEquivalent } from "../../../../../utils";

const handleCellChange: any = async (
  changes: any,
  hotInstance: Handsontable | null | undefined,
  isTableLocked: boolean,
  setIsTableLocked: React.Dispatch<React.SetStateAction<boolean>>,
  handleSave: (value: any, isNew: boolean, productId: string) => Promise<any>,
  dataProvider: any[],
  setDataProvider: React.Dispatch<React.SetStateAction<any[]>>,
  template: any,
) => {
  const typeFileIdList = template?.fields?.fields
    ?.map((itemTemplate: any) => {
      if (itemTemplate.type === "file") {
        return itemTemplate.id;
      }
      return null;
    })
    .filter(Boolean);
  if (changes !== null && changes.length && !isTableLocked && hotInstance) {
    const isNew = !!dataProvider[changes[0][0]].id;
    const customChanges = changes as Handsontable.CellChange[];
    const newValue = dataProvider[customChanges[0][0]];
    typeFileIdList.forEach((itemTypeFileId: any) => {
      if (newValue[itemTypeFileId]) {
        const arrayImages = newValue[itemTypeFileId];
        const convertedUrl = arrayImages?.map((imageUrl: string) => {
          return imageUrl?.replace(/^https:\/\/[^/]+\//, "");
        });
        newValue[itemTypeFileId] = convertedUrl || [convertedUrl];
      }
    });
    if (
      typeof customChanges[0][2] === "object" &&
      typeof customChanges[0][3] === "object" &&
      !isEquivalent(customChanges[0][2], customChanges[0][3])
    ) {
      try {
        if (!isNew) setIsTableLocked(true);
        const id = await handleSave(
          dataProvider[customChanges[0][0]],
          isNew,
          dataProvider[customChanges[0][0]]?.id,
        );
        if (
          id &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            id.toString(),
          )
        ) {
          const updated = dataProvider;
          updated[customChanges[0][0]].id = id;
          setDataProvider(updated);
        }
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
      try {
        if (!isNew) setIsTableLocked(true);
        const id = await handleSave(
          dataProvider[customChanges[0][0]],
          isNew,
          dataProvider[customChanges[0][0]]?.id,
        );
        if (
          id &&
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
            id.toString(),
          )
        ) {
          const updated = dataProvider;
          updated[customChanges[0][0]].id = id;
          setDataProvider(updated);
        }
      } finally {
        if (!isNew) setIsTableLocked(false);
      }
    }
  }
};

export default handleCellChange;
