import { HotTable } from "@handsontable/react";

function disableMultiSelectionWithControl(
  event: MouseEvent,
  hotRef: React.RefObject<HotTable>,
): void {
  if (event.ctrlKey) {
    if (hotRef.current && hotRef.current.hotInstance) {
      const selectedRange = hotRef.current.hotInstance.getSelected();
      if (selectedRange && selectedRange?.length >= 1) {
        event.stopImmediatePropagation();
        event.preventDefault();
        hotRef.current.hotInstance.deselectCell();
      }
    }
  }
}

export default disableMultiSelectionWithControl;
