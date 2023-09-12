import { toast } from "react-toastify";

export default (
  column: number,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  template: any,
  currentCell: any,
  columns: any[],
  cols: any[],
  setCols: React.Dispatch<React.SetStateAction<any[]>>,
  setHeaders: React.Dispatch<React.SetStateAction<string[]>>,
  handleRemoveColumn: (
    column: number,
    fields: any[],
    newColumns: any[],
    fieldId: string,
  ) => void,
): void => {
  setIsOpen((prev: boolean) => !prev);
  try {
    const fields = template?.fields?.fields?.filter((item: any) => {
      return item?.id !== currentCell?.id;
    });

    const newColumns = [...columns];
    newColumns.splice(currentCell.order, 1);

    const newCols = [...cols];
    newCols.splice(Number(column), 1);
    setCols(newCols);

    const contentHeaders = newColumns
      .map((element) => {
        const ids = fields?.map((item: any) => item?.id) as any[];
        if (ids.includes(element?.data)) {
          return element.title;
        }
        return null;
      })
      ?.filter((title) => title !== null);

    contentHeaders.push(" ");
    setHeaders(contentHeaders);

    handleRemoveColumn(
      Number(currentCell?.order),
      fields,
      newColumns,
      currentCell?.id,
    );
    window.location.reload();
    toast.success("Coluna deletada com sucesso");
  } catch (error) {
    console.error(error);
    toast.error(
      "Ocorreu um erro ao excluir a coluna, porfavor tente novamente",
    );
  }
};
