/* eslint-disable no-nested-ternary */
import Select from "react-select";
import { useEffect, useMemo, useRef, useState } from "react";
import { ContainerSelect, FakePlaceHolder, customStyles } from "./styles";
import CustomOption from "../../../Select/components/Option";
import CustomInputFilter from "../CustomInputFilter";
import OptionMulti from "../OptionMulti";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import { useFilterContext } from "../../../../context/FilterContext";
import useOutsideClick from "../../../../hooks/useOnClickOutside/useOnClickOutside";

const SelectFilter = ({
  select,
  onChange,
  options,
  placeHolder,
  small,
  isSearchable,
  isDisabled,
  isMulti,
  item,
  index,
  loadingOptions,
}: ISelect): JSX.Element => {
  const initialOptions = useMemo(() => options, []);
  const [currentOptions, setCurrentOptions] = useState(options);
  const { getOptions } = useFilterContext();
  const [isFocused, setIsFocused] = useState(false);

  const [searchText, setSearchText] = useState("");

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    if (debouncedSearchText && item) {
      getOptions(item, index, debouncedSearchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  const refMulti = useRef(null);
  const refContainerMulti = useRef(null);
  const refDefaultSelect = useRef(null);
  console.log("🚀 ~ file: index.tsx:44 ~ refDefaultSelect:", refDefaultSelect);

  const handleOutsideClick = (_e: any): void => {
    setCurrentOptions(initialOptions);
  };

  useOutsideClick(refContainerMulti, handleOutsideClick);

  const CustomOptionWithProps = CustomOption(<></>);

  const sortSelectedFirst = (selected: any, optionsToSorted: any): any => {
    if (optionsToSorted && optionsToSorted.length > 0) {
      const selectedValues = selected?.map((sItem: any) => sItem?.value);
      const sortedOptions = [...optionsToSorted]?.sort((a, b) => {
        const aIsSelected = selectedValues?.includes(a.value);
        const bIsSelected = selectedValues?.includes(b.value);

        if (aIsSelected && !bIsSelected) {
          return -1;
        }
        if (!aIsSelected && bIsSelected) {
          return 1;
        }
        return 0;
      });

      return sortedOptions;
    }
    return selected;
  };

  const [currentPlaceHolder, setPlaceHolder] = useState(placeHolder);

  return (
    <ContainerSelect
      focused={isFocused}
      onClick={() => {
        if (isMulti) {
          (refMulti as any).current?.focus();
          setIsFocused(true);
        }
      }}
      isDisabled={isDisabled}
    >
      {!isMulti ? (
        <Select
          ref={refDefaultSelect}
          options={options}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
          value={select}
          classNamePrefix="react-select-default"
          onChange={(selectedOption) => {
            onChange(selectedOption as string);
          }}
          onFocus={() => setPlaceHolder("Digite aqui")}
          styles={customStyles({ small }) as any}
          components={{
            SingleValue: CustomInputFilter,
            Option: CustomOptionWithProps as any,
          }}
          placeholder={currentPlaceHolder}
        />
      ) : (
        <div ref={refContainerMulti}>
          <Select
            ref={refMulti}
            isMulti
            isSearchable
            isDisabled={loadingOptions}
            classNamePrefix="react-select"
            options={sortSelectedFirst(select, currentOptions)}
            placeholder=""
            value={select}
            components={{
              Option: OptionMulti as any,
            }}
            hideSelectedOptions={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
            }}
            styles={customStyles({ small }) as any}
            onChange={(selectedOption) => {
              setIsFocused(false);
              onChange(selectedOption);
            }}
            closeMenuOnSelect={false}
            isClearable={false}
            onInputChange={(e) => setSearchText(e)}
          />
        </div>
      )}
      {isMulti && !searchText && (
        <FakePlaceHolder
          onClick={() => {
            setIsFocused(true);
            (refMulti as any).current?.focus();
          }}
        >
          {loadingOptions
            ? "Carregando Dados ..."
            : isFocused
            ? "Digite aqui"
            : !searchText && select?.length > 0
            ? `Selecionado(s): ${select?.length}`
            : "Selecionar"}
        </FakePlaceHolder>
      )}
    </ContainerSelect>
  );
};

export default SelectFilter;
