import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Contents,
  Filters,
  Header,
  IconTemplate,
  Item,
  LeftContent,
  MoreOptions,
  RightContent,
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
import { IHeaderTable } from "../../../../context/products/product.context";
import EditableText from "../../../EditableText";
import FromTo from "../../../FromTo";
import { useFromToContext } from "../../../../context/FromToContext";
import { ReactComponent as LinkIcon } from "../../../../assets/linkPublicList.svg";

import { integrationsRequest } from "../../../../services/apis/requests/integration";
import { useIntegration } from "../../../../context/IntegrationContext";

function HeaderFilters({
  template,
  headerTable,
  handleGetProductFiltered,
  handleAddProductClick,
  isPublic,
  total,
}: {
  template: any;
  headerTable: IHeaderTable[];
  handleGetProductFiltered: (keyword: string) => void;
  handleAddProductClick: () => void;
  isPublic?: boolean;
  total: number;
}): JSX.Element {
  const location = useLocation();
  const isOutsidePage = location.pathname.includes("outside");

  const navigate = useNavigate();
  const totalPrice = (total * 3).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const { setFromToIsOpened, setCurrentStep, setStepType, setAllRowsSelected } =
    useFromToContext();

  const { setErrors, errors, setSidebarErrorOpened, offset, limit } =
    useIntegration();

  const getErrors = useCallback(async () => {
    try {
      const id = window.location.pathname.split("/")[2];
      if (!id.includes("public")) {
        const response = await integrationsRequest.listIntegrationsErrors({
          limit,
          offset,
          id,
        });
        setErrors(response);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error fetching errors:", error);
    }
  }, [limit, offset, setErrors]);

  useEffect(() => {
    getErrors();
  }, [getErrors]);
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
          <EditableText
            initialContent={template?.name}
            isEditing={isEditingTitle}
            setIsEditing={setIsEditingTitle}
          />
          <EditIcon onClick={() => setIsEditingTitle(true)} />
        </LeftContent>
        <RightContent>
          {isPublic && (
            <Button
              height="52px"
              width="331px"
              className="secondButton linkButton"
              onClick={() => {
                setStepType(isOutsidePage ? "publicListOutside" : "publicList");
                setCurrentStep(2);
                setFromToIsOpened(true);
                setAllRowsSelected(true);
              }}
            >
              Vincular lista completa ({totalPrice})
              <LinkIcon />
            </Button>
          )}
          <MoreOptions>
            <EllipsisIcon />
          </MoreOptions>
          {!isPublic && (
            <>
              <Button
                height="52px"
                width="227px"
                isSecondary
                onClick={() => {
                  setFromToIsOpened(true);
                  setStepType("manageLinkedLists");
                }}
              >
                <DownloadIcon />
                Gerenciar vínculos
              </Button>
              <Button
                height="52px"
                width="227px"
                isSecondary
                className="secondButton"
                onClick={() => setFromToIsOpened(true)}
              >
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
            </>
          )}
        </RightContent>
      </Header>
      <Filters>
        <Temp
          options={headerTable}
          handleSearch={handleGetProductFiltered}
          isPublic={isPublic}
        />
        <Contents>
          <Item>
            <HelpIcon />
            Ajuda
          </Item>
        </Contents>
      </Filters>
      <FromTo />
    </>
  );
}

export default HeaderFilters;
