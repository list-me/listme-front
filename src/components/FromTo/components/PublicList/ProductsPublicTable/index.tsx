import { useState } from "react";
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
import { ContainerProductsPublicTable } from "./styles";

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
          licenseKey="non-commercial-and-evaluation"
          data={data}
          colHeaders={colHeaders}
          readOnly
          manualColumnResize
          rowHeights="52px"
          height="100vh"
          autoColumnSize
        />
      </Container>
    </ContainerProductsPublicTable>
  );
}

export default ProductsPublicTable;
