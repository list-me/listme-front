import React, { useEffect, useRef, useState } from "react";
import { Container, Content, Options } from "./styles";
import { ICellProps, IOption } from "./Cell.d";
import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down-small.svg";
import { ReactComponent as AltText } from "../../assets/text-alt.svg";
import { ReactComponent as PencilIcon } from "../../assets/pencei-icon.svg";
import { ReactComponent as CopyIcon } from "../../assets/copy-icon.svg";
import { ReactComponent as EyeOffIcon } from "../../assets/eye-off.svg";
import { ReactComponent as FrozenIcon } from "../../assets/frozen.svg";
import { ReactComponent as AscIcon } from "../../assets/sort-asc.svg";
import { ReactComponent as DescIcon } from "../../assets/sort-desc.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash-red.svg";
import { DropdownMenu } from "../DropdownMenu";
import { PersonalModal } from "../CustomModa";

export const HeaderCell: React.FC<ICellProps> = ({
  label,
  column,
  template,
  handleFrozen = () => {},
  handleSort = () => {},
  handleHidden = () => {},
  freeze,
  test,
  test1,
  handleDeleteColumn,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef(null);
  const [titleHeader, setTitleHeader] = useState<string>(label);
  const [posicaoPai, setPosicaoPai] = useState<number | null>(null);
  const [options, setOptions] = useState<any[]>();

  useEffect(() => {
    const customOptions: IOption[] = [
      {
        label: "Editar Campo",
        icon: <PencilIcon />,
        action: "update",
      },
      {
        label: "Duplicar Campo",
        icon: <CopyIcon />,
        action: "duplicate",
      },
      {
        label: "Ocultar Coluna",
        icon: <EyeOffIcon />,
        action: "hidden",
      },
      {
        label: freeze ? "Descongelar Campo" : "Congelar Campo",
        icon: <FrozenIcon />,
        action: "freeze",
      },
      {
        label: "Ordenar de A a Z",
        icon: <AscIcon />,
        action: "asc",
      },
      {
        label: "Ordenar de Z a A",
        icon: <DescIcon />,
        action: "desc",
      },
      {
        label: "Excluir coluna",
        icon: <TrashIcon />,
        action: "delete",
      },
    ];
    setOptions([...customOptions]);

    const pai = ref.current;
    if (pai) {
      const left = pai?.getBoundingClientRect().left + window.scrollX;
      setPosicaoPai(left);
    }
  }, [isOpen, column, freeze]);

  return (
    <>
      <DropdownMenu
        changeOpen={() => {
          setIsOpen(!isOpen);
        }}
        isOpen={isOpen}
        icoRef={iconRef}
        openModal={(option): void => {
          if (option.action === "delete") {
            handleDeleteColumn();
            setIsOpen(!isOpen);
            return;
          }

          if (option.label.includes("Ordenar")) {
            handleSort(option, option.action);
          } else if (option?.label.includes("Ocultar")) {
            setIsOpen(!isOpen);
            handleHidden(option, column?.hidden);
            return;
          } else if (option.action === "freeze") {
            console.log({ column });
            if (!freeze) {
              handleFrozen(column, "");
            } else {
              handleFrozen(column, "unfreeze");
            }
          } else {
            setIsOpenModal(!isOpenModal);
          }

          test();
          setIsOpen(!isOpen);
        }}
        options={options as any}
        left={posicaoPai}
        setIsOpen={() => {
          setIsOpen(false);
        }}
        template={template}
        col={column?.order}
      />
      <Content ref={ref}>
        <PersonalModal
          isOpen={isOpenModal}
          onClickModal={() => setIsOpenModal(!isOpenModal)}
          data={column}
          template={template}
          onUpdate={(e: any) => {
            setTitleHeader(e.title);
            window.location.reload();
          }}
        />
        <Container
          // onMouseEnter={() => test1()}
          onMouseDown={() => test1()}
        >
          <label htmlFor=" ">
            <AltText />
            {titleHeader}
          </label>
        </Container>
        <Options
          // onMouseEnter={(e) => console.log({e})}
          onMouseDown={() => {
            test();
            setIsOpen(true);
          }}
        >
          <ChevronDownIcon className="settings" ref={iconRef} />
        </Options>
        {/* <DropdownMenu
                    changeOpen={() => {
                        setIsOpen(!isOpen)
                    }}
                    isOpen={isOpen}
                    icoRef={iconRef}
                    openModal={(e, col) => {
                        if (e.label.includes("Ordenar")) {
                            handleSort(e, e?.operation);
                        } else if (e?.label.includes("Ocultar")) {
                            setIsOpen(!isOpen);
                            handleHidden(e, column?.hidden);
                            return;
                        } else if (e.operation === "freeze") {
                            if (!freeze) {
                                handleFrozen(col, "");
                            } else {
                                handleFrozen(col, "unfreeze");
                            }

                            const test = !freeze;
                            // setFrozen(test)
                        } else {
                            setIsOpenModal(!isOpenModal)
                        };

                        setIsOpen(!isOpen);
                    }}
                    options={options}
                    left={posicaoPai}
                    setIsOpen={() => {setIsOpen(false)}}
                    template={template}
                    col={column?.order}
                /> */}
      </Content>
    </>
  );
};

export const Cell = HeaderCell;
