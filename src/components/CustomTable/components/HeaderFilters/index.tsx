import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Contents,
  Filters,
  Header,
  IconTemplate,
  Item,
  LeftContent,
  MoreOptions,
  RightContent,
  Title,
} from "../../../../pages/products/styles";
import { ReactComponent as ArrowIcon } from "../../../../assets/arrow-left.svg";
import { ReactComponent as EllipsisIcon } from "../../../../assets/ellipsis.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/download.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/add.svg";
import { ReactComponent as FlagIcon } from "../../../../assets/icons/flag.svg";
import { ReactComponent as EditIcon } from "../../../../assets/x-edit.svg";
import { ReactComponent as HelpIcon } from "../../../../assets/help.svg";
import { ROUTES } from "../../../../constants/routes";
import Button from "../../../Button";
import { Temp } from "../../../Temp";
import { IHeaderTable } from "../../../../context/products";

function HeaderFilters({
  template,
  headerTable,
  handleGetProductFiltered,
  handleAddProductClick,
}: {
  template: any;
  headerTable: IHeaderTable[];
  handleGetProductFiltered: (keyword: string) => void;
  handleAddProductClick: () => void;
}): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <LeftContent>
          <ArrowIcon
            onClick={() => {
              navigate(ROUTES.TEMPLATES);
            }}
          />
          <IconTemplate>
            <FlagIcon />
          </IconTemplate>
          <Title> {template?.name} </Title>
          <EditIcon />
        </LeftContent>
        <RightContent>
          <MoreOptions>
            <EllipsisIcon />
          </MoreOptions>
          <Button height="52px" width="227px" isSecondary>
            <DownloadIcon />
            Importar produtos
          </Button>
          <Button
            height="52px"
            width="226px"
            className="secondButton"
            onClick={handleAddProductClick}
          >
            Adicionar produto
            <PlusIcon />
          </Button>
        </RightContent>
      </Header>
      <Filters>
        <Temp options={headerTable} handleSearch={handleGetProductFiltered} />
        <Contents>
          <Item>
            <HelpIcon />
            Ajuda
          </Item>
        </Contents>
      </Filters>
    </>
  );
}

export default HeaderFilters;
