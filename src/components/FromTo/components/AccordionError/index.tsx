import { useMemo, useState } from "react";
import {
  AccordionColumnContentText,
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderContent,
  AccordionItemContent,
  AccordionSuccessTitle,
  ItemIntegrationSuccess,
} from "./styles";
import { ReactComponent as DropDownIconSmall } from "../../../../assets/chevron-down-small.svg";
import { useFromToContext } from "../../../../context/FromToContext";
import IconNexaas from "../../../../assets/icons/MiniIconNexaas.png";
import IconNuvemShop from "../../../../assets/icons/MiniIcon-NuvemShop.png";
import IconShopify from "../../../../assets/icons/MiniIconShopify.png";
import IconVTEX from "../../../../assets/icons/MiniIconVTEX.png";

const headerTitles = ["Coluna", "Erro", " Nº de ocorrências"];

function AccordionError({
  typeFinished,
}: {
  typeFinished: "warn" | "error" | "success";
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeFinished === "warn") return false;
    return true;
  });

  const { csvResponse, providersToIntegration } = useFromToContext();
  console.log("🚀 ~ providersToIntegration:", providersToIntegration);

  // eslint-disable-next-line consistent-return
  const itemsToView = useMemo(() => {
    if (typeFinished === "warn") return csvResponse.warnings;
    if (typeFinished === "error") return csvResponse.errors;
  }, [csvResponse.errors, csvResponse.warnings, typeFinished]);

  const warnTextError = `Infelizmente, ${csvResponse.warnings?.length} ${
    csvResponse.warnings?.length > 1
      ? "colunas foram importadas com falhas"
      : "coluna foi importada com falha"
  }`;

  const icons: { [key: string]: any } = {
    nexaas: IconNexaas,
    nuvemshop: IconNuvemShop,
    shopify: IconShopify,
    vtex: IconVTEX,
  };

  return (
    <AccordionContainer backgroundType={typeFinished}>
      {typeFinished === "warn" && (
        <AccordionHeader onClick={() => setIsOpen(!isOpen)} opened={isOpen}>
          <h4>{warnTextError}</h4>
          <DropDownIconSmall />
        </AccordionHeader>
      )}
      <AccordionContent className={isOpen ? "open" : ""}>
        <AccordionHeaderContent>
          {typeFinished !== "success"
            ? headerTitles.map((title: string) => (
                <AccordionColumnContentText key={title}>
                  {title}
                </AccordionColumnContentText>
              ))
            : providersToIntegration.length > 0 && (
                <AccordionSuccessTitle>
                  Envio iniciado para as seguintes integrações:
                </AccordionSuccessTitle>
              )}
        </AccordionHeaderContent>
        {typeFinished !== "success" ? (
          itemsToView?.map((item) => (
            <AccordionItemContent>
              <AccordionColumnContentText>
                {item.column}
              </AccordionColumnContentText>
              <AccordionColumnContentText>
                {item.reason}
              </AccordionColumnContentText>
              <AccordionColumnContentText>
                {item.total}
              </AccordionColumnContentText>
            </AccordionItemContent>
          ))
        ) : (
          <>
            {providersToIntegration.length > 0 &&
              providersToIntegration.map((item) => (
                <ItemIntegrationSuccess>
                  <img src={icons[item]} alt={item} width={20} height={20} />
                  {item}
                </ItemIntegrationSuccess>
              ))}
          </>
        )}
      </AccordionContent>
    </AccordionContainer>
  );
}

export default AccordionError;
