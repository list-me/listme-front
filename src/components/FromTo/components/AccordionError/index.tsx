import { useState } from "react";
import {
  AccordionColumnContentText,
  AccordionContainer,
  AccordionContent,
  AccordionHeader,
  AccordionHeaderContent,
  AccordionItemContent,
} from "./styles";
import { ReactComponent as DropDownIconSmall } from "../../../../assets/chevron-down-small.svg";

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

  const itemsMock = [
    { colun: "Única", error: "Opção inexistente", quantity: "2" },
    { colun: "Seleção", error: "Opção inexistente", quantity: "10" },
    { colun: "Suspensa", error: "Opção inexistente", quantity: "112" },
    { colun: "Única", error: "Opção inexistente", quantity: "2" },
    { colun: "Seleção", error: "Opção inexistente", quantity: "10" },
    { colun: "Suspensa", error: "Opção inexistente", quantity: "112" },
    { colun: "Única", error: "Opção inexistente", quantity: "2" },
    { colun: "Seleção", error: "Opção inexistente", quantity: "10" },
    { colun: "Suspensa", error: "Opção inexistente", quantity: "112" },
    { colun: "Única", error: "Opção inexistente", quantity: "2" },
    { colun: "Seleção", error: "Opção inexistente", quantity: "10" },
    { colun: "Suspensa", error: "Opção inexistente", quantity: "112" },
  ];

  return (
    <AccordionContainer backgroundType={typeFinished}>
      {typeFinished === "warn" && (
        <AccordionHeader onClick={() => setIsOpen(!isOpen)} opened={isOpen}>
          <h4>Infelizmente, 10 itens foram importados com falhas</h4>
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
        {itemsMock.map((item) => (
          <AccordionItemContent>
            <AccordionColumnContentText>
              {item.colun}
            </AccordionColumnContentText>
            <AccordionColumnContentText>
              {item.error}
            </AccordionColumnContentText>
            <AccordionColumnContentText>
              {item.quantity}
            </AccordionColumnContentText>
          </AccordionItemContent>
        ))}
      </AccordionContent>
    </AccordionContainer>
  );
}

export default AccordionError;
