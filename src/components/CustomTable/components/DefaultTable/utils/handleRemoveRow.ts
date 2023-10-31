import Handsontable from "handsontable";

async function handleRemoveRow(
  hotInstance: Handsontable | null,
  selection: any[],
  handleDelete: Function,
  dataProvider: any,
): Promise<void> {
  await handleDelete(dataProvider[selection[0].start.row]);
  hotInstance?.alter("remove_row", selection[0].start.row);
}

export default handleRemoveRow;
