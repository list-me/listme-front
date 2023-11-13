/* eslint-disable no-nested-ternary */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ContainerMultiSelect,
  MenuOptions,
  Option,
  SearchOption,
  MultiSelectValue,
  LoadingData,
  Alert,
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
import {
  IFilter,
  IInputValue,
} from "../../../../context/FilterContext/FilterContextType";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import { useFilterContext } from "../../../../context/FilterContext";

enum IconType {
  Text = "text",
  Paragraph = "paragraph",
  Checked = "checked",
  List = "list",
  File = "file",
  Radio = "radio",
  Relation = "relation",
}

function MultiSelect({
  options,
  placeHolder,
  changeValue,
  index,
  type,
  isSearchable,
  select,
  loadingOptions,
  item,
}: {
  options: { value: string; label: string }[];
  placeHolder: string;
  changeValue: React.Dispatch<React.SetStateAction<IInputValue>>;
  index: number;
  type: "selectValue" | "value" | "column" | "condition";
  select: IInputValue;
  // eslint-disable-next-line react/require-default-props
  isSearchable?: boolean;
  // eslint-disable-next-line react/require-default-props
  loadingOptions?: boolean;
  item: IFilter;
}): JSX.Element {
  const idsSelecteds = select?.value?.map(
    (itemSelected: { value: string; label: string }) => {
      return itemSelected.value;
    },
  );

  const [currentOptions, setCurrentOptions] =
    useState<{ value: string; label: string }[]>(options);
  const [searchValue, setSearchValue] = useState<string>("");
  const debaunceSearchValue = useDebounce(searchValue, 500);

  const { getOptions } = useFilterContext();

  useEffect(() => {
    function filterOptions(value: string): void {
      const filteredOptions = currentOptions.filter((fOptions) => {
        return fOptions.label.toLowerCase().includes(value.toLowerCase());
      });
      if (filteredOptions.length > 0) setCurrentOptions(filteredOptions);
      else getOptions(item, index, debaunceSearchValue, true);
    }
    if (debaunceSearchValue.length > 0) filterOptions(debaunceSearchValue);
  }, [debaunceSearchValue]);

  useEffect(() => {
    if (options.length > 0) setCurrentOptions(options);
  }, [options]);

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
    setCurrentOptions(options);
    setSearchValue("");
  });

  const [optionsSelected, setOptionsSelected] = useState<
    { value: string; label: string }[]
  >(select?.value?.length > 0 ? select.value : []);

  function selectOption(option: { value: string; label: string }): void {
    const includes = optionsSelected?.some(
      (selectedOption) => selectedOption.value === option.value,
    );

    if (includes) {
      const updatedOptions = optionsSelected?.filter(
        (selectedOption) => selectedOption.value !== option.value,
      );
      setOptionsSelected(updatedOptions);
    } else {
      const updatedOptions = [...optionsSelected, option];
      setOptionsSelected(updatedOptions);
    }
  }

  useEffect(() => {
    changeValue({ value: optionsSelected, index, typeChange: type });
  }, [changeValue, index, optionsSelected, type]);

  return (
    <ContainerMultiSelect ref={menuRef} openedMenu={openedMenu}>
      <MultiSelectValue
        active={!!select?.value?.length}
        onClick={() => setOpenedMenu(true)}
      >
        <div>
          {select.typeChange && getIconByType(select.typeChange as any)}
          {select?.value?.length
            ? `Selecionado(s): ${select?.value?.length}`
            : placeHolder}
        </div>
        <div className="icon">
          <DownIcon />
        </div>
      </MultiSelectValue>
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
            {loadingOptions ? (
              <LoadingData>Buscando Dados...</LoadingData>
            ) : (
              !!currentOptions?.length &&
              currentOptions?.map((opt) => (
                <Option
                  key={opt?.value}
                  onClick={() => {
                    selectOption(opt);
                  }}
                  active={idsSelecteds?.includes(opt?.value)}
                >
                  {opt?.label}
                </Option>
              ))
            )}
          </div>
          {currentOptions?.length === 0 && (
            <Alert>Nenhum item encontrado</Alert>
          )}
          {currentOptions?.length === 100 && (
            <Alert>Mostrando os 100 primeiros</Alert>
          )}
        </MenuOptions>
      )}
    </ContainerMultiSelect>
  );
}

export default MultiSelect;
