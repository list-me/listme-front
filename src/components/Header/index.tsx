import { useState } from "react";
import { toast } from "react-toastify";
import { Container, RightContent } from "./styles";
import { Profile } from "../Profile";
import { Notification } from "../Notification";
import Button from "../Button";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { TempModal } from "../TempModal";
import { templateRequests } from "../../services/apis/requests/template";
import { IPaginationTemplate } from "../../pages/templates/templates";

export function Header({
  handleGetTemplates,
}: {
  handleGetTemplates: ({ page, limit }: IPaginationTemplate) => void;
}): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
        <RightContent>
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
          <Notification />
          <Profile />
        </RightContent>
      </Container>
    </>
  );
}

export default Header;
