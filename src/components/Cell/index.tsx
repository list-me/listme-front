import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Tag } from "antd";
import { Container, Content, Options } from "./styles";
import { ICellProps, IOption, IconType } from "./Cell.d";

import { ReactComponent as TextIcon } from "../../assets/icons/headers/text-icon.svg";
import { ReactComponent as ParagraphIcon } from "../../assets/icons/headers/textarea-icon.svg";
import { ReactComponent as CheckedIcon } from "../../assets/icons/headers/checked-icon.svg";
import { ReactComponent as DropdownIcon } from "../../assets/icons/headers/dropdown-icon.svg";
import { ReactComponent as FileIcon } from "../../assets/icons/headers/file-icon.svg";
import { ReactComponent as RadioIcon } from "../../assets/icons/headers/radio-icon.svg";
import { ReactComponent as RelationIcon } from "../../assets/icons/headers/relation-icon.svg";

import { ReactComponent as ChevronDownIcon } from "../../assets/chevron-down-small.svg";
import { ReactComponent as PencilIcon } from "../../assets/pencei-icon.svg";
import { ReactComponent as CopyIcon } from "../../assets/copy-icon.svg";
import { ReactComponent as EyeOffIcon } from "../../assets/eye-off.svg";
import { ReactComponent as FrozenIcon } from "../../assets/frozen.svg";
import { ReactComponent as AscIcon } from "../../assets/sort-asc.svg";
import { ReactComponent as DescIcon } from "../../assets/sort-desc.svg";
import { ReactComponent as TrashIcon } from "../../assets/trash-red.svg";
import { ReactComponent as NumericIcon } from "../../assets/numeric-icon.svg";
import { ReactComponent as DecimalIcon } from "../../assets/decimal-icon.svg";
import { ReactComponent as BooleanIcon } from "../../assets/boolean-icon.svg";
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
  handleDeleteColumn,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef(null);
  const [titleHeader, setTitleHeader] = useState<string>(label);
  const [options, setOptions] = useState<any[]>();

  const ICON_HEADER: Record<IconType, ReactElement> = {
    [IconType.Text]: <TextIcon />,
    [IconType.Paragraph]: <ParagraphIcon />,
    [IconType.Checked]: <CheckedIcon />,
    [IconType.List]: <DropdownIcon />,
    [IconType.File]: <FileIcon />,
    [IconType.Radio]: <RadioIcon />,
    [IconType.Relation]: <RelationIcon />,
    [IconType.Numeric]: <NumericIcon />,
    [IconType.Decimal]: <DecimalIcon />,
    [IconType.Boolean]: <BooleanIcon />,
  };

  const getIconByType = (type: IconType): ReactElement => {
    return ICON_HEADER[type];
  };

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
  }, [isOpen, column, freeze]);

  return (
    <>
      <DropdownMenu
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
            if (!freeze) {
              handleFrozen(column, "");
            } else {
              handleFrozen(column, "unfreeze");
            }
          } else {
            setIsOpenModal(!isOpenModal);
          }

          setIsOpen(!isOpen);
        }}
        options={options as any}
        setIsOpen={() => {
          setIsOpen(false);
        }}
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
            // window.location.reload();
          }}
        />
        <Container>
          <label htmlFor=" ">
            {getIconByType(column?.type)}
            {titleHeader}
          </label>
        </Container>
        <Options>
          {column?.required ? (
            <Tag
              style={{
                width: "fit-content",
                height: "fit-content",
                border: "solid 1px #FF0000",
                borderRadius: "20px",
                backgroundColor: "none",
                color: "#FF0000",
              }}
            >
              Obrigatório
            </Tag>
          ) : (
            <></>
          )}

          <ChevronDownIcon
            className="settings"
            onClick={() => setIsOpen(!isOpen)}
            ref={iconRef}
          />
        </Options>
      </Content>
    </>
  );
};

export const Cell = HeaderCell;
