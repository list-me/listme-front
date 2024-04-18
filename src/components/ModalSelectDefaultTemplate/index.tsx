import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  CloseButton,
  ContentModalSelectDefaultTemplate,
  CoverCardSelectDefaultTemplate,
  ItemCardSelectDefaultTemplate,
} from "./styles";
import Modal from "../Modal";
import Button from "../Button";
import { ReactComponent as RadioUnchecked } from "../../assets/radio-unchecked.svg";
import { ReactComponent as RadioChecked } from "../../assets/radio-checked.svg";
import { ReactComponent as CloseIcon } from "../../assets/close-gray.svg";
import { IPaginationTemplate } from "../../pages/templates/templates";
import { templateRequests } from "../../services/apis/requests/template";
import { ROUTES } from "../../constants/routes";

function ModalSelectDefaultTemplate({
  isOpen,
  setIsOpen,
  handleGetTemplatesAll,
  templatesAll,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetTemplatesAll: ({ page, limit }: IPaginationTemplate) => void;
  templatesAll: any;
}): JSX.Element {
  const [indexItem, setIndexItem] = useState(0);
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  async function createTemplate(): Promise<void> {
    try {
      await templateRequests.postDefault(
        "list",
        (templates[indexItem] as any).id,
      );
      handleGetTemplatesAll({ page: 0, limit: 100 });
      toast.success("Template criado com sucesso");
      const newTemplateId = templatesAll[templatesAll.length - 1]?.id;
      if (newTemplateId) {
        navigate(`${ROUTES.PRODUCTS}/${newTemplateId}`);
      }
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o template");
    }
  }

  const handleGetTemplates = (): void => {
    templateRequests
      .listDefault()
      .then((response) => {
        setTemplates(response);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos");
        console.error(error);
      });
  };

  useEffect(() => {
    handleGetTemplates();
  }, []);

  return (
    <Modal isOpen={isOpen} changeVisible={() => setIsOpen((prev) => !prev)}>
      <ContentModalSelectDefaultTemplate>
        <CloseButton onClick={() => setIsOpen((prev) => !prev)}>
          <CloseIcon />
        </CloseButton>
        <h1>Selecione o modelo de template</h1>
        {templates.map((item: any, index) => (
          <ItemCardSelectDefaultTemplate
            key={item}
            onClick={() => setIndexItem(index)}
          >
            <div>
              <CoverCardSelectDefaultTemplate>
                {item?.name?.charAt(0).toUpperCase()}
              </CoverCardSelectDefaultTemplate>
              {item.name}
            </div>
            {index === indexItem ? <RadioChecked /> : <RadioUnchecked />}
          </ItemCardSelectDefaultTemplate>
        ))}
        <Button onClick={() => createTemplate()}>Criar template</Button>
      </ContentModalSelectDefaultTemplate>
    </Modal>
  );
}

export default ModalSelectDefaultTemplate;
