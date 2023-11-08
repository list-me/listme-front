/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useCallback, useMemo } from "react";
import { ReactComponent as TextIcon } from "../../../../assets/icons/headers/text-icon.svg";
import { ReactComponent as ParagraphIcon } from "../../../../assets/icons/headers/textarea-icon.svg";
import { ReactComponent as CheckedIcon } from "../../../../assets/icons/headers/checked-icon.svg";
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/headers/dropdown-icon.svg";
import { ReactComponent as FileIcon } from "../../../../assets/icons/headers/file-icon.svg";
import { ReactComponent as RadioIcon } from "../../../../assets/icons/headers/radio-icon.svg";
import { ReactComponent as RelationIcon } from "../../../../assets/icons/headers/relation-icon.svg";
import { CustomInputFilterContainer } from "./styles";
// import { Container } from './styles';
enum IconType {
  Text = "text",
  Paragraph = "paragraph",
  Checked = "checked",
  List = "list",
  File = "file",
  Radio = "radio",
  Relation = "relation",
}

function CustomInputFilter(props: any): JSX.Element {
  const { label, type } = props?.data;

  const ICON_HEADER = useMemo(
    () => ({
      [IconType.Text]: <TextIcon />,
      [IconType.Paragraph]: <ParagraphIcon />,
      [IconType.Checked]: <CheckedIcon />,
      [IconType.List]: <DropdownIcon />,
      [IconType.File]: <FileIcon />,
      [IconType.Radio]: <RadioIcon />,
      [IconType.Relation]: <RelationIcon />,
    }),
    [],
  );

  const getIconByType = useCallback(
    (currentType: IconType): ReactElement => {
      return ICON_HEADER[currentType];
    },
    [ICON_HEADER],
  );

  return (
    <>
      <CustomInputFilterContainer {...props} title={label}>
        {getIconByType(type)}
        {label}
      </CustomInputFilterContainer>
    </>
  );
}

export default CustomInputFilter;
