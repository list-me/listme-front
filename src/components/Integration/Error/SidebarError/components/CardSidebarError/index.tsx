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
import { IDataErrorIntegrations } from "../../../../../../context/IntegrationContext/IntegrationContext";

function CardSidebarError({
  error,
  setSearchIntegration,
}: {
  setSearchIntegration: React.Dispatch<React.SetStateAction<string>>;
  error: IDataErrorIntegrations;
}): JSX.Element {
  const [opened, setOpened] = useState(false);

  const item = error.product.firstColumnValue;

  function convertDateTimeToBrazilFormat(dateTimeUTC: string): string {
    const dateTime = new Date(dateTimeUTC);

    const day = `0${dateTime.getUTCDate()}`.slice(-2);
    const monthAbbrev = new Intl.DateTimeFormat("en", {
      month: "short",
    }).format(dateTime);
    const year = dateTime.getUTCFullYear();

    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/Sao_Paulo",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    };

    const timeBrazil = dateTime.toLocaleString("en-US", options);

    return `${day} de ${monthAbbrev}, ${year} - ${timeBrazil}`;
  }

  const hourDate = convertDateTimeToBrazilFormat(error.createdAt);

  const extractTexts = (msg: any) => {
    try {
      const result = JSON.parse(msg);

      if (Array.isArray(result) && typeof result[0] === "string") {
        return result;
      }
      if (
        Array.isArray(result) &&
        typeof result[0] === "object" &&
        result[0] !== null
      ) {
        const listReturn: any[] = [];
        const objs = result;
        objs.forEach((obj: any) => {
          const keys = Object.keys(obj);
          keys.forEach((currentKey) => {
            obj[currentKey].forEach((currentItem: any) => {
              listReturn.push(currentItem);
            });
          });
        });

        return listReturn;
      }
      if (typeof result === "string") {
        return [result];
      }
    } catch (err) {
      return [msg];
    }
  };

  extractTexts(error.message);

  return (
    <ContainerCardSidebarError opened={opened}>
      <HeaderCardSidebarError>
        <HeaderContentLeftCardSidebarError>
          <img src={LogoNexaas} alt="Logo" width={48} height={48} />
          <ContainerTextMore>
            <TextHeaderSidebarError>{`"${item[0]}"`}</TextHeaderSidebarError>
            <MoreButton onClick={() => setOpened(!opened)}>
              Saiba mais
            </MoreButton>
          </ContainerTextMore>
        </HeaderContentLeftCardSidebarError>
        <HeaderContentRightCardSidebarError>
          <HourDateText>{hourDate}</HourDateText>
          <ChevronButton onClick={() => setOpened(!opened)}>
            <ChevronDownIcon />
          </ChevronButton>
        </HeaderContentRightCardSidebarError>
      </HeaderCardSidebarError>
      <ContentCardSidebarError opened={opened}>
        {extractTexts(error.message)?.map((currentMessage) => (
          <ItemErrorDesc>
            <span>Error: </span>
            {currentMessage}
          </ItemErrorDesc>
        ))}
        <ButtonProductView onClick={() => setSearchIntegration(item[0])}>
          Ver produto
        </ButtonProductView>
      </ContentCardSidebarError>
    </ContainerCardSidebarError>
  );
}

export default CardSidebarError;
