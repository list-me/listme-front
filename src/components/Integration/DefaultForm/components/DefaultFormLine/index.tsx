/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { KeyText } from "../../styles";
import SelectComponent from "../../../../Select";
import { IconType } from "../../../../Cell/Cell.d";
import { ReactComponent as TextIcon } from "../../../../../assets/icons/headers/text-icon.svg";
import { ReactComponent as ParagraphIcon } from "../../../../../assets/icons/headers/textarea-icon.svg";
import { ReactComponent as CheckedIcon } from "../../../../../assets/icons/headers/checked-icon.svg";
import { ReactComponent as DropdownIcon } from "../../../../../assets/icons/headers/dropdown-icon.svg";
import { ReactComponent as FileIcon } from "../../../../../assets/icons/headers/file-icon.svg";
import { ReactComponent as RadioIcon } from "../../../../../assets/icons/headers/radio-icon.svg";
import { ReactComponent as RelationIcon } from "../../../../../assets/icons/headers/relation-icon.svg";
import { DataField } from "../../../../CustomTable/components/HeaderDropDown/components/NewColumn/RelationForm/RelationForm";
import { templateRequests } from "../../../../../services/apis/requests/template";
import { ContainerDefaultFormLine } from "./styles";
// import { Container } from './styles';

function DefaultFormLine({
  item,
  changeForm,
  indexItem,
  formToFinish,
  valueColLeft,
}: {
  item: {
    id: string;
    key: string;
    cast: string;
    types: any;
    required: boolean;
  };
  changeForm: (e: any, index: number, localValue: string) => void;
  indexItem: number;
  formToFinish: { firstValue: any; secondValue: any }[];
  valueColLeft: any;
}): JSX.Element {
  console.log("🚀 ~ valueColLeft:", valueColLeft);
  const covertCast: { [key: string]: any } = {
    string: "text",
  };

  const ICON_HEADER: Record<IconType, ReactElement> = {
    [IconType.Text]: <TextIcon />,
    [IconType.Paragraph]: <ParagraphIcon />,
    [IconType.Checked]: <CheckedIcon />,
    [IconType.List]: <DropdownIcon />,
    [IconType.File]: <FileIcon />,
    [IconType.Radio]: <RadioIcon />,
    [IconType.Relation]: <RelationIcon />,
  };

  const getIconByType = (type: IconType): ReactElement => {
    return ICON_HEADER[type];
  };

  const [fieldsToOptions, setFieldsToOptions] = useState<DataField[]>([]);

  function getCols(id: string): void {
    templateRequests
      .get(id)
      .then((response) => {
        // ver tipagem depois
        const fieldsMap = response.fields.fields.map((mItem: any) => {
          return { label: mItem.title, value: mItem };
        });
        console.log("veio");
        setFieldsToOptions(fieldsMap);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos relacionados");
        console.error(error);
      });
  }

  return (
    <ContainerDefaultFormLine>
      <KeyText>
        {getIconByType(covertCast[item.cast])}
        {item.key}
        {item.required && <span className="required">*</span>}
      </KeyText>
      <SelectComponent
        select={valueColLeft || null}
        onChange={(e) => {
          getCols(e.value.options[0].templateId);
          changeForm(e, indexItem, "first");
        }}
        options={[]}
        placeHolder=""
        small
        isDisabled
      />
      <SelectComponent
        select={formToFinish[indexItem].secondValue || null}
        onChange={(e) => {
          changeForm(e, indexItem, "second");
        }}
        options={fieldsToOptions}
        placeHolder=""
        small
      />
    </ContainerDefaultFormLine>
  );
}

export default DefaultFormLine;
