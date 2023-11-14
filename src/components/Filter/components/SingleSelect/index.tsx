import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ContainerSingleSelect,
  MenuOptions,
  Option,
  SearchOption,
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
import { ReactComponent as SearchIcon } from "../../../../assets/search-gray.svg";
import useOutsideClick from "../../../../hooks/useOnClickOutside/useOnClickOutside";
import { IColumnFilter } from "../../../../context/FilterContext/FilterContextType";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";

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
  select,
  isSearchable,
  isDisabled,
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
  select: IColumnFilter;
  // eslint-disable-next-line react/require-default-props
  isSearchable?: boolean;
  // eslint-disable-next-line react/require-default-props
  isDisabled: boolean;
}): JSX.Element {
  const [currentOptions, setCurrentOptions] = useState<IOption[]>(options);
  const [searchValue, setSearchValue] = useState<string>("");
  const debaunceSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    function filterOptions(value: string): void {
      const filteredOptions = options.filter((fOptions) => {
        return fOptions.label.toLowerCase().includes(value.toLowerCase());
      });
      setCurrentOptions(filteredOptions);
    }

    if (debaunceSearchValue) filterOptions(debaunceSearchValue);
    else {
      setCurrentOptions(options);
    }
  }, [debaunceSearchValue, options]);

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

  useOutsideClick(menuRef, () => {
    setOpenedMenu(false);
    setSearchValue("");
  });

  return (
    <ContainerSingleSelect
      ref={menuRef}
      openedMenu={openedMenu}
      isDisabled={isDisabled}
    >
      <SingleSelectValue
        active={!!select?.label}
        onClick={() => setOpenedMenu((prev) => !prev)}
      >
        <div>
          {select.type && getIconByType(select.type as any)}
          {select?.label || placeHolder}
        </div>
        <div className="icon">
          <DownIcon />
        </div>
      </SingleSelectValue>
      {openedMenu && (
        <MenuOptions>
          {isSearchable && (
            <div className="searchContainer">
              <SearchOption
                placeholder="Busque..."
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div className="searchIcon">
                <SearchIcon />
              </div>
            </div>
          )}
          <div className="optionsContainer">
            {currentOptions?.map((opt) => (
              <Option
                key={opt.value}
                onClick={() => {
                  changeValue(opt, index, type);
                  setOpenedMenu(false);
                  setCurrentOptions(options);
                  setSearchValue("");
                }}
                active={opt?.value === select?.value}
              >
                {getIconByType(opt?.type as any)}
                {opt?.label}
              </Option>
            ))}
          </div>
        </MenuOptions>
      )}
    </ContainerSingleSelect>
  );
}

export default SingleSelect;
