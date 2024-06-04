import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  ButtonPrev,
  ChevronIcon,
  Container,
  CurrentProduct,
  IntegrationBreadCrumb,
  RightContent,
  TitlePage,
} from "./styles";
import { Profile } from "../Profile";
import { Notification } from "../Notification";
import Button from "../Button";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { TempModal } from "../TempModal";
import { templateRequests } from "../../services/apis/requests/template";
import { IPaginationTemplate } from "../../pages/templates/templates";
import { ReactComponent as ArrowLeft } from "../../assets/arrow-left.svg";
import { ReactComponent as Chevron } from "../../assets/chevron-down.svg";
import { ROUTES } from "../../constants/routes";
import ModalSelectDefaultTemplate from "../ModalSelectDefaultTemplate";

export function Header({
  handleGetTemplates,
  templates,
}: {
  templates: any;
  handleGetTemplates: ({ page, limit }: IPaginationTemplate) => void;
}): JSX.Element {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { id } = useParams(); // Obtém o parâmetro 'id' da URL

  const hasIntegrationAndId =
    id && window.location.pathname.includes("integration");

  const [isOpenModalCreateTemplate, setIsOpenModalCreateTemplate] =
    useState(false);

  return (
    <>
      <TempModal
        isOpen={modalIsOpen}
        onClickModal={() => setModalIsOpen(!modalIsOpen)}
      />
      <ModalSelectDefaultTemplate
        isOpen={isOpenModalCreateTemplate}
        setIsOpen={setIsOpenModalCreateTemplate}
        handleGetTemplatesAll={handleGetTemplates}
        templatesAll={templates}
      />

      <Container>
        {hasIntegrationAndId && (
          <IntegrationBreadCrumb>
            <ButtonPrev
              onClick={() => {
                navigate(ROUTES.INTEGRATION);
              }}
            >
              <ArrowLeft />
            </ButtonPrev>
            <TitlePage>Integrações</TitlePage>
            <ChevronIcon>
              <Chevron />
            </ChevronIcon>
            <CurrentProduct>Nexaas</CurrentProduct>
          </IntegrationBreadCrumb>
        )}
        <RightContent>
          {!hasIntegrationAndId && (
            <Button
              isLoading={false}
              width="152px"
              height="45px"
              onClickModal={() => setIsOpenModalCreateTemplate(true)}
              // onClickModal={() => createTemplate()}
            >
              <AddIcon />
              Criar template
            </Button>
          )}
          <Notification />
          <Profile />
        </RightContent>
      </Container>
    </>
  );
}

export default Header;
