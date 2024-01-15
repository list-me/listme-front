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
  valueColLeft,
  changePayloadToFinish,
  index,
}: {
  item: {
    id: string;
    key: string;
    cast: string;
    types: any;
    required: boolean;
  };
  valueColLeft: any;
  changePayloadToFinish: (
    valueLeft: any,
    valueRight: any,
    index: number,
  ) => void;
  index: number;
}): JSX.Element {
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
  const [secondValueSelected, setSecondValueSelected] = useState(null);

  function getCols(id: string): void {
    templateRequests
      .get(id)
      .then((response) => {
        const fieldsMap = response.fields.fields.map((mItem: any) => {
          return { label: mItem.title, value: mItem };
        });
        setFieldsToOptions(fieldsMap);
      })
      .catch((error) => {
        toast.error("Ocorreu um erro ao listar os catálogos relacionados");
        console.error(error);
      });
  }

  useEffect(() => {
    setSecondValueSelected(null);
    if (valueColLeft?.value?.id) {
      getCols(valueColLeft?.value?.id);
    }
  }, [valueColLeft?.value?.id]);

  const optionsToView = fieldsToOptions.filter((fItem) => {
    return item.types.includes(fItem.value.type);
  });

  return (
    <ContainerDefaultFormLine>
      <KeyText>
        {getIconByType(covertCast[item.cast])}
        {item.key}
        {item.required && <span className="required">*</span>}
      </KeyText>
      <SelectComponent
        select={valueColLeft || null}
        options={[]}
        placeHolder="Selecione..."
        small
        isDisabled
        onChange={() => ""}
      />
      <SelectComponent
        select={secondValueSelected}
        onChange={(e) => {
          changePayloadToFinish(valueColLeft, e, index);
          setSecondValueSelected(e);
        }}
        options={optionsToView}
        placeHolder="Selecione..."
        small
        isDisabled={!valueColLeft}
      />
    </ContainerDefaultFormLine>
  );
}

export default DefaultFormLine;
