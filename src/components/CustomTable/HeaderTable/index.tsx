import React, { Dispatch, RefObject, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { HotTable } from "@handsontable/react";
import {
  Header,
  IconTemplate,
  LeftContent,
  MoreOptions,
  RightContent,
  Title,
} from "../../../pages/products/styles";
import { ReactComponent as EllipsisIcon } from "../../../assets/ellipsis.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/download.svg";
import { ReactComponent as PlusIcon } from "../../../assets/add.svg";
import { ReactComponent as ArrowIcon } from "../../../assets/arrow-left.svg";
import { ReactComponent as FlagIcon } from "../../../assets/icons/flag.svg";
import { ReactComponent as EditIcon } from "../../../assets/x-edit.svg";
import { ROUTES } from "../../../constants/routes";
import Button from "../../Button";

interface IHeaderTable {
  hotRef: RefObject<HotTable>;
  setDataProvider: Dispatch<SetStateAction<any[]>>;
  template: any;
}

const HeaderTable: React.FC<IHeaderTable> = ({
  hotRef,
  setDataProvider,
  template,
}) => {
  const navigate = useNavigate();

  return (
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
          onClick={() => {
            const { hotInstance } = hotRef.current!;
            if (hotInstance) {
              setDataProvider((prev) => [{}, ...prev]);
            }
          }}
        >
          Adicionar produto
          <PlusIcon />
        </Button>
      </RightContent>
    </Header>
  );
};

export default HeaderTable;
