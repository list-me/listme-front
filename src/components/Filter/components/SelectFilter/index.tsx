/* eslint-disable no-nested-ternary */
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import { ContainerSelect, FakeValue, customStyles } from "./styles";
import CustomOption from "../../../Select/components/Option";
import CustomInputFilter from "../CustomInputFilter";
import OptionMulti from "../OptionMulti";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import { useFilterContext } from "../../../../context/FilterContext";

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
  // const initialOptions = useMemo(() => options, []);
  const [currentOptions, setCurrentOptions] = useState(options);
  const { getOptions } = useFilterContext();

  const [searchText, setSearchText] = useState("");

  const debouncedSearchText = useDebounce(searchText, 500);

  const refDefaultSelect = useRef(null);

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

  const [visibleMulti, setVisibleMulti] = useState(false);

  const MultiRef = useRef(null);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    setCurrentOptions(options);
  }, [options]);

  useEffect(() => {
    const includes =
      options && Array.isArray(options)
        ? options.filter((opt: any) =>
            opt.label.toLowerCase().includes(debouncedSearchText.toLowerCase()),
          )
        : [];
    if (!includes.length && debouncedSearchText && item) {
      getOptions(item, index, debouncedSearchText, true).then(() => {
        setVisibleMulti(true);
        setTimeout(() => {
          if (MultiRef.current) {
            (MultiRef as any).current.focus();
          }
        }, 10);
        setMenuIsOpen(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  return (
    <ContainerSelect isDisabled={isDisabled}>
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
        <div>
          {!visibleMulti ? (
            <FakeValue
              onClick={() => {
                setVisibleMulti(true);
                setTimeout(() => {
                  if (MultiRef.current) {
                    (MultiRef as any).current.focus();
                  }
                }, 10);
                setMenuIsOpen(true);
              }}
            >
              {loadingOptions
                ? "Carregando Dados..."
                : select?.length > 0
                ? `Selecionado(s): ${select?.length}`
                : "Selecionar"}
            </FakeValue>
          ) : (
            <Select
              ref={MultiRef}
              className="multiSelect"
              isMulti
              isSearchable
              isDisabled={loadingOptions}
              classNamePrefix="react-select"
              options={sortSelectedFirst(select, currentOptions)}
              placeholder="Digite Aqui"
              value={select}
              components={{
                Option: OptionMulti as any,
              }}
              onBlur={() => setVisibleMulti(false)}
              inputValue={searchText}
              defaultInputValue={searchText}
              hideSelectedOptions={false}
              styles={customStyles({ small }) as any}
              onChange={(selectedOption) => {
                onChange(selectedOption);
              }}
              closeMenuOnSelect={false}
              isClearable={false}
              onInputChange={(e) => setSearchText(e)}
              menuIsOpen={menuIsOpen}
            />
          )}
        </div>
      )}
    </ContainerSelect>
  );
};

export default SelectFilter;
