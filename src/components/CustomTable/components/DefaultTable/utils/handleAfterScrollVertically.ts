import { HotTable } from "@handsontable/react";

const handleAfterScrollVertically = (
  hotRef: React.RefObject<HotTable>,
  total: number,
  dataProvider: any[],
  loadingRef: React.RefObject<HTMLDivElement>,
  setIsTableLocked: React.Dispatch<React.SetStateAction<boolean>>,
  handleGetProductsFiltered: (
    key: string,
    templateId: string,
  ) => Promise<any[]>,
  currentKeyword: string,
  template: any,
): void => {
  const { hotInstance } = hotRef.current!;
  if (hotInstance) {
    const holder = hotInstance.rootElement.querySelector(".wtHolder");
    if (holder) {
      const scrollableHeight = holder.scrollHeight * 0.75;
      const { scrollTop } = holder;
      const visibleHeight = holder.clientHeight;

      if (
        scrollTop + visibleHeight >= scrollableHeight &&
        total > dataProvider.length
      ) {
        // eslint-disable-next-line no-param-reassign
        loadingRef.current!.style.display = "block";
        setIsTableLocked(true);
        handleGetProductsFiltered(currentKeyword, template.id);
        console.log("ta vindo aqui");
      }
    }
  }
};

export default handleAfterScrollVertically;
