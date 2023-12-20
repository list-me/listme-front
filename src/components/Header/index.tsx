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

export function Header({
  handleGetTemplates,
}: {
  handleGetTemplates: ({ page, limit }: IPaginationTemplate) => void;
}): JSX.Element {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { id } = useParams(); // Obtém o parâmetro 'id' da URL

  const hasIntegrationAndId =
    id && window.location.pathname.includes("integration");

  async function createTemplate(): Promise<void> {
    try {
      await templateRequests.post("list");
      handleGetTemplates({ page: 0, limit: 100 });
      toast.success("Template criado com sucesso");
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o template");
    }
  }

  return (
    <>
      <TempModal
        isOpen={modalIsOpen}
        onClickModal={() => setModalIsOpen(!modalIsOpen)}
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
              // onClickModal={() => setModalIsOpen(!modalIsOpen)}
              onClickModal={() => createTemplate()}
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
