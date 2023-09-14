import Handsontable from "handsontable";

function isSelectedRowEmpty(
  hotInstance: Handsontable | null,
  selection: any[],
): boolean | undefined {
  return hotInstance?.isEmptyRow(selection[0].start.row);
}

async function handleRemoveRow(
  hotInstance: Handsontable | null,
  selection: any[],
  handleDelete: Function,
  dataProvider: any,
): Promise<void> {
  if (isSelectedRowEmpty(hotInstance, selection)) {
    hotInstance?.alter("remove_row", selection[0].start.row);
  } else {
    await handleDelete(dataProvider[selection[0].start.row]);
    hotInstance?.alter("remove_row", selection[0].start.row);
  }
}

export default handleRemoveRow;
