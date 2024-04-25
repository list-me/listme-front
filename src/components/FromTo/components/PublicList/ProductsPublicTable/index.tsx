import { ContainerProductsPublicTable } from "./styles";
import CustomTable from "../../../../CustomTable";

function ProductsPublicTable(): JSX.Element {
  // const hotRef = useRef();

  // const ICON_HEADER = useMemo(
  //   () => ({
  //     [IconType.Text]: <TextIcon />,
  //     [IconType.Paragraph]: <ParagraphIcon />,
  //     [IconType.Checked]: <CheckedIcon />,
  //     [IconType.List]: <DropdownIcon />,
  //     [IconType.File]: <FileIcon />,
  //     [IconType.Radio]: <RadioIcon />,
  //     [IconType.Relation]: <RelationIcon />,
  //   }),
  //   [],
  // );
  // const getIconByType = useCallback(
  //   (type: IconType): ReactElement => {
  //     return ICON_HEADER[type];
  //   },
  //   [ICON_HEADER],
  // );

  // const styledHeader = useCallback(
  //   (column: number, TH: HTMLTableHeaderCellElement): void => {
  //     const colData = template?.fields?.fields.find(
  //       (item: any) => item.id === headerTable[column]?.data,
  //     );
  //     const { required: isRequired } = colData || {};
  //     const columnHeaderValue =
  //       hotRef.current?.hotInstance?.getColHeader(column);
  //     const valueToVisible =
  //       columnHeaderValue !== " " ? columnHeaderValue : "+";
  //     const iconType = getIconByType(colData?.type);

  //     TH.innerHTML = getStyledContent(iconType, valueToVisible, isRequired);
  //   },
  //   [getIconByType, headerTable, hotRef, template?.fields?.fields],
  // );

  return (
    <ContainerProductsPublicTable>
      <CustomTable isPublic />
    </ContainerProductsPublicTable>
  );
}

export default ProductsPublicTable;
