/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { components } from "react-select";
import { ReactElement, useCallback, useMemo, useState } from "react";
import { ReactComponent as ChevronDownIcon } from "../../../../assets/chevron-down-small.svg";
import {
  ContainerNewColumn,
  ContainerOption,
  GhostArrow,
  IconDropDown,
  ValueWidthDropDown,
} from "./styles";
import { ReactComponent as TextIcon } from "../../../../assets/icons/headers/text-icon.svg";
import { ReactComponent as ParagraphIcon } from "../../../../assets/icons/headers/textarea-icon.svg";
import { ReactComponent as CheckedIcon } from "../../../../assets/icons/headers/checked-icon.svg";
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/headers/dropdown-icon.svg";
import { ReactComponent as FileIcon } from "../../../../assets/icons/headers/file-icon.svg";
import { ReactComponent as RadioIcon } from "../../../../assets/icons/headers/radio-icon.svg";
import { ReactComponent as RelationIcon } from "../../../../assets/icons/headers/relation-icon.svg";
import { ReactComponent as NumericIcon } from "../../../../assets/numeric-icon.svg";
import { ReactComponent as DecimalIcon } from "../../../../assets/decimal-icon.svg";
import { ReactComponent as BooleanIcon } from "../../../../assets/boolean-icon.svg";

enum IconType {
  Text = "text",
  Paragraph = "paragraph",
  Checked = "checked",
  List = "list",
  File = "file",
  Radio = "radio",
  Relation = "relation",
  Numeric = "numeric",
  Decimal = "decimal",
  Boolean = "boolean",
}

const CustomOption = (AdditionalComponent: any): JSX.Element => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const ICON_HEADER = useMemo(
    () => ({
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
    }),
    [],
  );

  const getIconByType = useCallback(
    (type: IconType): ReactElement => {
      return ICON_HEADER[type];
    },
    [ICON_HEADER],
  );

  // @ts-ignore
  return (props: any) => {
    const { label } = props?.data;
    const type = props?.data?.type || props?.value?.type;
    if (!props!.data.openDropdown)
      return (
        <components.Option {...props}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {getIconByType(type)}
            <div>{label}</div>
          </div>
        </components.Option>
      );
    return (
      <>
        <ContainerOption
          onMouseEnter={() => {
            setDropdownOpen(true);
          }}
          onMouseLeave={() => {
            setDropdownOpen(false);
          }}
        >
          <components.Option
            {...props}
            onClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <ValueWidthDropDown>
              <div>{props!.data.value}</div>
              <IconDropDown>
                <ChevronDownIcon />
              </IconDropDown>
            </ValueWidthDropDown>

            {isDropdownOpen && (
              <ContainerNewColumn>
                <AdditionalComponent />
                <GhostArrow />
              </ContainerNewColumn>
            )}
          </components.Option>
        </ContainerOption>
      </>
    );
  };
};

export default CustomOption;
