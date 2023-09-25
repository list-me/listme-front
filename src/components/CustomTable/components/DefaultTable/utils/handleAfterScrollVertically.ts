/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
import { HotTable } from "@handsontable/react";
import { toast } from "react-toastify";
import {
  ICustomCellType,
  IHeaderTable,
} from "../../../../../context/products/product.context";
import { productRequests } from "../../../../../services/apis/requests/product";

let isFetchingNextPage = false;

const handleAfterScrollVertically = async (
  hotRef: React.RefObject<HotTable>,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  dataProvider: any[],
  setDataProvider: React.Dispatch<React.SetStateAction<any[]>>,
  loadingRef: React.RefObject<HTMLDivElement>,
  setIsTableLocked: React.Dispatch<React.SetStateAction<boolean>>,
  template: any,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  headerTable: IHeaderTable[],
  componentCellPerType: ICustomCellType,
  currentKeyword: string,
): Promise<void> => {
  const { hotInstance } = hotRef.current!;
  if (hotInstance && !isFetchingNextPage) {
    const holder = hotInstance.rootElement.querySelector(".wtHolder");
    if (holder) {
      const scrollableHeight = holder.scrollHeight;
      const { scrollTop } = holder;
      const visibleHeight = holder.clientHeight;

      const triggerPosition = scrollableHeight * 0.95;

      if (
        scrollTop + visibleHeight >= triggerPosition &&
        scrollTop + visibleHeight < triggerPosition + 500 &&
        total > dataProvider.length
      ) {
        isFetchingNextPage = true;
        loadingRef.current!.style.display = "block";
        setIsTableLocked(true);

        try {
          const response = await productRequests.list(
            { keyword: currentKeyword, page, limit: 100 },
            window.location.pathname.substring(10),
          );

          const productFields: any[] = [];

          const { data } = response;
          if (data) {
            data.products?.forEach((item: any) => {
              const object: any = {};
              item.fields.forEach((field: any) => {
                const currentField = headerTable.find(
                  (e: any) => e.data == field.id,
                );

                if (currentField && field.value) {
                  const test = !componentCellPerType[
                    currentField?.type?.toUpperCase()
                  ]
                    ? field?.value[0]
                    : field?.value;

                  object[field?.id] = test;
                }
              });
              productFields.push({
                ...object,
                id: item.id,
                created_at: item.created_at,
              });
            });

            if (!productFields.length && template) {
              productFields.push({ [template[0]]: "" });
            }

            setDataProvider((prev) => [...prev, ...productFields]);
            setTotal(data.total);
            setPage(page + 1);
            loadingRef.current!.style.display = "none";
            setIsTableLocked(false);
          }
        } catch (error) {
          loadingRef.current!.style.display = "none";
          setIsTableLocked(false);

          if (hotInstance) {
            hotInstance.render();
          }
          // @ts-ignore
          toast.error(error?.response?.data?.message || "An error occurred");
        } finally {
          isFetchingNextPage = false;
        }
      }
    }
  }
};

export default handleAfterScrollVertically;
