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

  const { csvError } = useFromToContext();

  const itemsToView = useMemo(() => {
    if (typeFinished === "warn") return csvError.warnings;
    if (typeFinished === "error") return csvError.errors;
  }, [csvError.errors, csvError.warnings, typeFinished]);

  const warnTextError = `Infelizmente, ${csvError.warnings.length} ${
    csvError.warnings.length > 1
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
