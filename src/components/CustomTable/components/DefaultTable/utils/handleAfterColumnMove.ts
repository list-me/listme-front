/* eslint-disable no-param-reassign */
const handleAfterColumnMove = (
  movedColumns: number[],
  finalIndex: number,
  dropIndex: number | undefined,
  movePossible: boolean,
  orderChanged: boolean,
  columns: any,
  setHeaders: React.Dispatch<React.SetStateAction<string[]>>,
  handleMove: Function,
): void => {
  if (!orderChanged) return;

  let newColumns = [...columns];
  movedColumns.forEach((oldIndex) => {
    const movedColumn = newColumns.splice(oldIndex, 1)[0];
    newColumns.splice(finalIndex, 0, movedColumn);
    finalIndex += 1;
  });

  newColumns = newColumns.map((item, index) => {
    if (Object.keys(item).length) {
      return {
        ...item,
        order: index.toString(),
      };
    }
    return item;
  });

  setHeaders(newColumns.map((item) => item?.title ?? " "));
  handleMove(newColumns);
};

export default handleAfterColumnMove;