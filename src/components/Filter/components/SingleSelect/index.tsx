import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ContainerSingleSelect,
  MenuOptions,
  Option,
  SingleSelectValue,
} from "./styles";
import { ReactComponent as DownIcon } from "../../../../assets/chevron-down-small.svg";
import { ReactComponent as TextIcon } from "../../../../assets/icons/headers/text-icon.svg";
import { ReactComponent as ParagraphIcon } from "../../../../assets/icons/headers/textarea-icon.svg";
import { ReactComponent as CheckedIcon } from "../../../../assets/icons/headers/checked-icon.svg";
import { ReactComponent as DropdownIcon } from "../../../../assets/icons/headers/dropdown-icon.svg";
import { ReactComponent as FileIcon } from "../../../../assets/icons/headers/file-icon.svg";
import { ReactComponent as RadioIcon } from "../../../../assets/icons/headers/radio-icon.svg";
import { ReactComponent as RelationIcon } from "../../../../assets/icons/headers/relation-icon.svg";
import useOutsideClick from "../../../../hooks/useOnClickOutside/useOnClickOutside";
import {
  IColumnFilter,
  IFilter,
} from "../../../../context/FilterContext/FilterContextType";

enum IconType {
  Text = "text",
  Paragraph = "paragraph",
  Checked = "checked",
  List = "list",
  File = "file",
  Radio = "radio",
  Relation = "relation",
}

function SingleSelect({
  options,
  placeHolder,
  changeValue,
  index,
  type,
  item,
  getOptions,
  select,
}: {
  options: IOption[];
  placeHolder: string;
  changeValue: (
    value: any,
    index: number,
    typeChange: "selectValue" | "value" | "column" | "condition",
  ) => void;
  index: number;
  type: "selectValue" | "value" | "column" | "condition";
  item: IFilter;
  getOptions: (currentItem: IFilter, index: number) => any;
  select: IColumnFilter;
}): JSX.Element {
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
    (iconType: IconType): React.ReactElement => {
      return ICON_HEADER[iconType];
    },
    [ICON_HEADER],
  );

  const [openedMenu, setOpenedMenu] = useState(false);

  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setOpenedMenu(false));

  return (
    <ContainerSingleSelect
      onClick={() => setOpenedMenu((prev) => !prev)}
      ref={menuRef}
      openedMenu={openedMenu}
    >
      <SingleSelectValue active={!!select?.label}>
        {select.type && getIconByType(select.type as any)}
        {select?.label || placeHolder}
      </SingleSelectValue>
      <DownIcon />
      {openedMenu && (
        <MenuOptions>
          {options.map((opt) => (
            <>
              <Option
                onClick={() => {
                  changeValue(opt, index, type);
                  getOptions(item, index);
                }}
                active={opt.value === select.value}
              >
                {getIconByType(opt.type as any)}
                {opt.label}
              </Option>
            </>
          ))}
        </MenuOptions>
      )}
    </ContainerSingleSelect>
  );
}

export default SingleSelect;
