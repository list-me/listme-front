import React, { useCallback, useRef, useState } from "react";
import { HotTable } from "@handsontable/react";
import {
  Container,
  Contents,
  Filters,
  Header,
  IconTemplate,
  Item,
  LeftContent,
  MoreOptions,
  RightContent,
} from "../../../../../pages/products/styles";
import { ReactComponent as EllipsisIcon } from "../../../../../assets/ellipsis.svg";
import { ReactComponent as FlagIcon } from "../../../../../assets/icons/flag.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/x-edit.svg";
import { ReactComponent as LinkIcon } from "../../../../../assets/linkPublicList.svg";
import { ReactComponent as HelpIcon } from "../../../../../assets/help.svg";

import EditableText from "../../../../EditableText";
import Button from "../../../../Button";
import { Temp } from "../../../../Temp";
import { BoxHotTablePublic, ContainerProductsPublicTable } from "./styles";

function ProductsPublicTable({
  template,
  data,
  colHeaders,
}: {
  template: any;
  data: any;
  colHeaders: any;
}): JSX.Element {
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
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
      <Header>
        <LeftContent>
          <IconTemplate>
            <FlagIcon />
          </IconTemplate>
          <EditableText
            initialContent={template?.name}
            isEditing={isEditingTitle}
            setIsEditing={setIsEditingTitle}
          />
          <EditIcon onClick={() => setIsEditingTitle(true)} />
        </LeftContent>
        <RightContent>
          <Button
            height="52px"
            width="331px"
            className="secondButton linkButton"
            // onClick={handleAddProductClick}
          >
            Vincular List completa (R$ 400)
            <LinkIcon />
          </Button>
          <MoreOptions>
            <EllipsisIcon />
          </MoreOptions>
        </RightContent>
      </Header>
      <Filters>
        <Temp publicList handleSearch={() => ""} />
        <Contents>
          <Item>
            <HelpIcon />
            Ajuda
          </Item>
        </Contents>
      </Filters>
      <Container>
        <HotTable
          // ref={hotRef}
          licenseKey="non-commercial-and-evaluation"
          data={data}
          colHeaders={colHeaders}
          readOnly
          manualColumnResize
          rowHeights="52px"
          height="100vh"
          autoColumnSize
          // afterGetColHeader={styledHeader}
        />
      </Container>
    </ContainerProductsPublicTable>
  );
}

export default ProductsPublicTable;
