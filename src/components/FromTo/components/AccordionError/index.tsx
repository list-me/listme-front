import { useMemo, useState } from "react";
import {
  AccordionColumnContentText,
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderContent,
  AccordionItemContent,
} from "./styles";
import { ReactComponent as DropDownIconSmall } from "../../../../assets/chevron-down-small.svg";
import { useFromToContext } from "../../../../context/FromToContext";

const headerTitles = ["Coluna", "Erro", " Nº de ocorrências"];

function AccordionError({
  typeFinished,
}: {
  typeFinished: "warn" | "error";
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeFinished === "warn") return false;
    return true;
  });

  const { csvResponse } = useFromToContext();

  // eslint-disable-next-line consistent-return
  const itemsToView = useMemo(() => {
    if (typeFinished === "warn") return csvResponse.warnings;
    if (typeFinished === "error") return csvResponse.errors;
  }, [csvResponse.errors, csvResponse.warnings, typeFinished]);

  const warnTextError = `Infelizmente, ${csvResponse.warnings.length} ${
    csvResponse.warnings.length > 1
      ? "itens foram importados com falhas"
      : "item foi importado com falha"
  }`;

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
          {headerTitles.map((title: string) => (
            <AccordionColumnContentText key={title}>
              {title}
            </AccordionColumnContentText>
          ))}
        </AccordionHeaderContent>
        {itemsToView?.map((item) => (
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
        ))}
      </AccordionContent>
    </AccordionContainer>
  );
}

export default AccordionError;
