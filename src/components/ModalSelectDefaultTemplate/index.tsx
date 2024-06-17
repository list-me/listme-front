import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  CloseButton,
  ContainerCardSelectDefaultTemplate,
  ContentModalSelectDefaultTemplate,
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

import imageBag from "../../assets/images/bag-default-template.svg";
import imagePlus from "../../assets/images/plus-default-template.svg";

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
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  async function createTemplate(indexItem: number): Promise<void> {
    try {
      // await templateRequests.postDefault(
      //   "list",
      //   (templates[indexItem] as any).id,
      // );
      // handleGetTemplatesAll({ page: 0, limit: 100 });
      // toast.success("Template criado com sucesso");
      // const newTemplateId = templatesAll[templatesAll.length - 1]?.id;
      // if (newTemplateId) {
      //   navigate(`${ROUTES.PRODUCTS}/${newTemplateId}`);
      // }
      console.log("VEIO");
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o template");
    }
  }

  const handleGetTemplates = (): void => {
    templateRequests
      .listDefault()
      .then((response) => {
        setTemplates([
          // @ts-ignore
          ...response,
          // @ts-ignore
          { name: "Estoque próprio (mock)" },
          // @ts-ignore
          { name: "Drop Shipping (mock)" },
          // @ts-ignore
          { name: "S/ modelo pré-definido (mock)" },
        ]);
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
    <Modal
      isOpen={isOpen}
      changeVisible={() => setIsOpen((prev) => !prev)}
      width={986}
    >
      <ContentModalSelectDefaultTemplate>
        <CloseButton onClick={() => setIsOpen((prev) => !prev)}>
          <CloseIcon />
        </CloseButton>
        <h1>Criar nova List</h1>
        <p>Escolha o modelo da List</p>
        <ContainerCardSelectDefaultTemplate>
          {templates.map((item: any, index) => (
            <ItemCardSelectDefaultTemplate
              key={item}
              onClick={
                index === 0
                  ? () => {
                      createTemplate(index);
                    }
                  : () => ""
              }
            >
              <div>
                <img src={index < 3 ? imageBag : imagePlus} alt={item.name} />
                <p>{item.name}</p>
              </div>
            </ItemCardSelectDefaultTemplate>
          ))}
        </ContainerCardSelectDefaultTemplate>
        {/* <Button onClick={() => createTemplate()}>Criar template</Button> */}
      </ContentModalSelectDefaultTemplate>
    </Modal>
  );
}

export default ModalSelectDefaultTemplate;
