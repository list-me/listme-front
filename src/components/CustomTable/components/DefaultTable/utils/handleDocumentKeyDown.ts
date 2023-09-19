import { HotTable } from "@handsontable/react";

/* eslint-disable no-plusplus */
function handleDocumentKeyDown(
  event: KeyboardEvent,
  hotRef: React.RefObject<HotTable>,
): void {
  const { hotInstance } = hotRef.current!;
  if (hotInstance) {
    if (event.key === "ArrowRight" && event.ctrlKey) {
      const selected = hotInstance.getSelected();
      if (selected) {
        const [startRow, , endRow] = selected[0];

        let lastVisibleCol = hotInstance.countCols() - 2;
        while (
          hotInstance.getColWidth(lastVisibleCol) === 0 &&
          lastVisibleCol >= 0
        ) {
          lastVisibleCol--;
        }

        if (lastVisibleCol >= 0) {
          hotInstance.selectCell(
            startRow,
            lastVisibleCol,
            endRow,
            lastVisibleCol,
          );
        }
      }
      event.preventDefault();
    }
  }
}
export default handleDocumentKeyDown;
