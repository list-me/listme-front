import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  ColumnsDefaultForm,
  ContainerDefaultForm,
  ContentDefaultForm,
  KeyText,
  TitleColumn,
} from "./styles";
import SelectComponent from "../../../Select";
import InfoAlert from "../../../InfoAlert";
import { IFieldsByID } from "../../../../pages/companyIntegration/companyIntegration";
import { IconType } from "../../../Cell/Cell.d";
import { ReactComponent as TextIcon } from "../../../../assets/icons/headers/text-icon.svg";
import { ReactComponent as ParagraphIcon } from "../../../../assets/icons/headers/textarea-icon.svg";
import { ReactComponent as CheckedIcon } from "../../../../assets/icons/headers/checked-icon.svg";
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/headers/dropdown-icon.svg";
import { ReactComponent as FileIcon } from "../../../../assets/icons/headers/file-icon.svg";
import { ReactComponent as RadioIcon } from "../../../../assets/icons/headers/radio-icon.svg";
import { ReactComponent as RelationIcon } from "../../../../assets/icons/headers/relation-icon.svg";

function DefaultForm({
  leftColumnName,
  centerColumnName,
  rightColumnName,
  dataForm,
}: {
  leftColumnName: string;
  centerColumnName: string;
  rightColumnName: string;
  dataForm: IFieldsByID;
}): JSX.Element {
  const arrayColumns = [leftColumnName, centerColumnName, rightColumnName];
  const { payload } = dataForm;

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

  const covertCast: { [key: string]: any } = {
    string: "text",
  };

  return (
    <ContainerDefaultForm>
      {arrayColumns.map((columnName, index) => (
        <ColumnsDefaultForm>
          <TitleColumn>{columnName}</TitleColumn>
          <ContentDefaultForm>
            {payload.map((item) => (
              <>
                {index === 0 && (
                  <KeyText>
                    {getIconByType(covertCast[item.cast])}
                    {item.key}
                    {item.required && <span className="required">*</span>}
                  </KeyText>
                )}
                {/* {index === 1 && (
                  <SelectComponent
                    select={undefined}
                    onChange={() => ""}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                )} */}
                {/* {index === 2 && (
                  <SelectComponent
                    select={undefined}
                    onChange={() => ""}
                    options={undefined}
                    placeHolder=""
                    small
                  />
                )} */}
              </>
            ))}
          </ContentDefaultForm>
        </ColumnsDefaultForm>
      ))}
    </ContainerDefaultForm>
  );
}

export default DefaultForm;
