import { useEffect, useRef, useState } from "react";
import { Filter, FilterItem, InputFilter, TrashButton } from "../../styles";
import { ReactComponent as TrashIcon } from "../../../../assets/trash-filter.svg";
import { IInputValue } from "../../../../context/FilterContext/FilterContextType";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import SingleSelect from "../SingleSelect";
import MultiSelect from "../MultiSelect";
import typesOptions from "../../../../context/FilterContext/utils/typesOptions";

function ConditionFilterComponent({
  item,
  index,
  filters,
  changeValue,
  options,
  optionsToMultiSelect,
  removeFilter,
  loadingOptions,
}: IConditionFilterComponent): JSX.Element {
  const [inputValue, setInputValue] = useState<IInputValue>({} as IInputValue);
  const debouncedInputValue = useDebounce(inputValue, 250);
  const [selectValue, setSelectValue] = useState<IInputValue>(
    {} as IInputValue,
  );
  const debouncedSelectValue = useDebounce(selectValue, 500);
  console.log("");
  const [clearStateFlag, setClearStateFlag] = useState(true);
  const isChangeFromFilters = useRef(false);

  useEffect(() => {
    if (clearStateFlag && !isChangeFromFilters.current)
      changeValue(
        debouncedInputValue.value,
        debouncedInputValue.index,
        debouncedInputValue.typeChange,
      );
  }, [changeValue, debouncedInputValue]);
  useEffect(() => {
    if (
      debouncedSelectValue.value &&
      clearStateFlag &&
      !isChangeFromFilters.current
    )
      changeValue(
        debouncedSelectValue.value,
        debouncedSelectValue.index,
        debouncedSelectValue.typeChange,
      );
  }, [changeValue, debouncedSelectValue]);

  useEffect(() => {
    setClearStateFlag(true);
  }, [inputValue, selectValue]);

  useEffect(() => {
    if (filters.length === 1 && !filters[0].column.value) {
      setClearStateFlag(() => false);
      isChangeFromFilters.current = true;
      setInputValue({} as IInputValue);
      setSelectValue({} as IInputValue);
    } else {
      isChangeFromFilters.current = false;
    }
  }, [filters]);

  return (
    <Filter
      key={item.id}
      smallBefore={index === 0}
      small={!!item?.condition?.input}
      trash={filters.length > 1}
    >
      <FilterItem>
        <SingleSelect
          placeHolder="Selecione a coluna"
          options={options}
          changeValue={changeValue}
          index={index}
          type="column"
          select={filters[index].column}
          isSearchable
        />
      </FilterItem>
      <FilterItem>
        <SingleSelect
          placeHolder="Condição"
          options={typesOptions[item.column.type]}
          changeValue={changeValue}
          index={index}
          type="condition"
          select={filters[index].condition}
        />
      </FilterItem>
      {item.condition.input && (
        <FilterItem>
          {item.condition.input === "text" ? (
            <InputFilter
              type="text"
              value={
                inputValue?.value ? inputValue.value : filters[index].value
              }
              placeholder="Insira o valor"
              onChange={(e) => {
                setInputValue({
                  value: e.target.value,
                  index,
                  typeChange: "value",
                });
              }}
            />
          ) : (
            <MultiSelect
              options={optionsToMultiSelect[index] as any}
              placeHolder="Selecione"
              changeValue={setSelectValue}
              index={index}
              type="selectValue"
              select={selectValue}
              isSearchable
              loadingOptions={loadingOptions}
              item={item}
              filters={filters}
            />
          )}
        </FilterItem>
      )}
      {filters.length > 1 && (
        <TrashButton
          onClick={() => {
            removeFilter(filters, index);
          }}
        >
          <TrashIcon />
        </TrashButton>
      )}
    </Filter>
  );
}

export default ConditionFilterComponent;
