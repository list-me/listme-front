import React, { useMemo, useState } from "react";
import Modal from "../../Modal";
import { ReactComponent as CloseIcon } from "../../../assets/close-gray.svg";
import {
  ButtonClose,
  ContainerButton,
  ContainerItems,
  ContentTop,
  Header,
  InputButtonWrapper,
  ItemButton,
  SectionTitle,
  Text,
  TextArea,
  TextSwitchWrapper,
  Title,
} from "./styles";
import DefaultInput from "../../DefaultInput";
import { NavigationButton } from "../../NavigationButton/styles";
import useDebounce from "../../../hooks/useDebounce/useDebounce";
import { useProductContext } from "../../../context/products";
import { SwitchCustom } from "../../RepDropdownMenu/styles";

function CollectInformation({
  setModalInformationOpened,
}: {
  setModalInformationOpened: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const [selecteds, setSelecteds] = useState<string[]>([]);
  const [instructions, setInstructions] = useState(false);

  const { template } = useProductContext();
  const items: { name: string; id: string }[] = template.fields.fields.map(
    (item: any) => {
      return { name: item.name, id: item.id };
    },
  );
  const debouncedInputValue = useDebounce(inputValue, 250);
  const itemsToView = useMemo(() => {
    const list = items.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(debouncedInputValue.toLowerCase());
    });
    return list;
  }, [debouncedInputValue, items]);

  function handleClick({
    currentItem,
  }: {
    currentItem: { name: string; id: string };
  }): void {
    setSelecteds((prev) => {
      if (prev.includes(currentItem.id)) {
        return prev.filter((id) => id !== currentItem.id);
      }
      return [...prev, currentItem.id];
    });
  }

  return (
    <Modal isOpen changeVisible={() => ""} width={640}>
      <Header>
        <Title>Coletar informações</Title>
        <ButtonClose onClick={() => setModalInformationOpened(false)}>
          <CloseIcon />
        </ButtonClose>
      </Header>
      <ContentTop>
        <InputButtonWrapper>
          <DefaultInput
            label=""
            type=""
            value={inputValue}
            changeValue={setInputValue}
            required={false}
            placeHolder=""
            alertTitle=""
            alertContent=""
          />
          <NavigationButton
            abort
            onClick={() => {
              const allIds = items.map((item) => item.id);
              setSelecteds(allIds);
            }}
          >
            Selecionar tudo
          </NavigationButton>
        </InputButtonWrapper>
        <SectionTitle>Selecione a coluna desejada</SectionTitle>
        <ContainerItems>
          {itemsToView.map((item) => (
            <ItemButton
              onClick={() => handleClick({ currentItem: item })}
              key={item.id}
              isActive={selecteds.includes(item.id)}
            >
              {item.name}
            </ItemButton>
          ))}
        </ContainerItems>
      </ContentTop>
      <TextSwitchWrapper>
        <Text>Dê instruções para a IA, se preferir</Text>
        <SwitchCustom checked={instructions} onChange={setInstructions} />
      </TextSwitchWrapper>
      {instructions && <TextArea />}
      <ContainerButton>
        <NavigationButton>Aplicar IA</NavigationButton>
      </ContainerButton>
    </Modal>
  );
}

export default CollectInformation;
