import React, { useState } from "react";
import {
  ButtonProductView,
  ChevronButton,
  ContainerCardSidebarError,
  ContainerTextMore,
  ContentCardSidebarError,
  HeaderCardSidebarError,
  HeaderContentLeftCardSidebarError,
  HeaderContentRightCardSidebarError,
  HourDateText,
  ItemErrorDesc,
  MoreButton,
  TextHeaderSidebarError,
} from "./styles";
import LogoNexaas from "../../../../../../assets/images/logoNexaas.png";
import { ReactComponent as ChevronDownIcon } from "../../../../../../assets/chevron-down-small.svg";

function CardSidebarError(): JSX.Element {
  const [opened, setOpened] = useState(false);

  const line = "Linha 2";
  const item =
    "Camisa Nike Brasil I 2023/Texto aqui pra ter parametro de corte";
  const itemToView = `${item.split("/")[0]}/...`;

  const listDescErrors = [
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
    "Detectamos um erro de integração em um produto cadastrado, afetando a funcionalidade do sistema. Estamos comprometidos em resolver rapidamente e pedimos desculpas por qualquer inconveniente.",
  ];

  return (
    <ContainerCardSidebarError opened={opened}>
      <HeaderCardSidebarError>
        <HeaderContentLeftCardSidebarError>
          <img src={LogoNexaas} alt="Logo" width={48} height={48} />
          <ContainerTextMore>
            <TextHeaderSidebarError>
              <span>{line}</span>
              {` - "${itemToView}"`}
            </TextHeaderSidebarError>
            <MoreButton onClick={() => setOpened(!opened)}>
              Saiba mais
            </MoreButton>
          </ContainerTextMore>
        </HeaderContentLeftCardSidebarError>
        <HeaderContentRightCardSidebarError>
          <HourDateText>12 de Fev, 2023 - 12:32</HourDateText>
          <ChevronButton onClick={() => setOpened(!opened)}>
            <ChevronDownIcon />
          </ChevronButton>
        </HeaderContentRightCardSidebarError>
      </HeaderCardSidebarError>
      <ContentCardSidebarError opened={opened}>
        {listDescErrors.map((current) => (
          <ItemErrorDesc>
            <span>Error: </span>
            {current}
          </ItemErrorDesc>
        ))}
        <ButtonProductView>Ver produto</ButtonProductView>
      </ContentCardSidebarError>
    </ContainerCardSidebarError>
  );
}

export default CardSidebarError;
