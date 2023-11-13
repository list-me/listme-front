import React, { useEffect, useState } from "react";
import { Filter, FilterItem, InputFilter, TrashButton } from "../../styles";
import SelectFilter from "../SelectFilter";
import { ReactComponent as TrashIcon } from "../../../../assets/trash-filter.svg";
import {
  IFilter,
  IInputValue,
} from "../../../../context/FilterContext/FilterContextType";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import SingleSelect from "../SingleSelect";
import MultiSelect from "../MultiSelect";

function ConditionFilterComponent({
  item,
  index,
  filters,
  changeValue,
  getOptions,
  typesOptions,
  options,
  optionsToMultiSelect,
  removeFilter,
  loadingOptions,
}: IConditionFilterComponent): JSX.Element {
  const [inputValue, setInputValue] = useState<IInputValue>({} as IInputValue);
  const debouncedInputValue = useDebounce(inputValue, 500);
  const [selectValue, setSelectValue] = useState<IInputValue>(
    {} as IInputValue,
  );
  const debouncedSelectValue = useDebounce(selectValue, 500);

  useEffect(() => {
    if (debouncedInputValue.value)
      changeValue(
        debouncedInputValue.value,
        debouncedInputValue.index,
        debouncedInputValue.typeChange,
      );
  }, [changeValue, debouncedInputValue]);
  useEffect(() => {
    if (debouncedSelectValue.value)
      changeValue(
        debouncedSelectValue.value,
        debouncedSelectValue.index,
        debouncedSelectValue.typeChange,
      );
  }, [changeValue, debouncedSelectValue]);

  function getColumnOptions(cOptions: IOption[]): IOption[] {
    const filtersNameColumn = filters.map((filt) => {
      return filt.column.label;
    });
    const filteredOptionsColumn = cOptions.filter((op) => {
      return !filtersNameColumn.includes(op.label);
    });
    return filteredOptionsColumn;
  }

  return (
    <Filter key={item.id} smallBefore={index === 0}>
      <FilterItem small={!!item.condition.input} trash={filters.length > 1}>
        <SingleSelect
          placeHolder="Selecione a coluna"
          options={options}
          changeValue={changeValue}
          index={index}
          type="column"
          item={item}
          getOptions={getOptions}
          select={filters[index].column}
          isSearchable
        />
      </FilterItem>
      <FilterItem small={!!item.condition.input} trash={filters.length > 1}>
        <SingleSelect
          placeHolder="Condição"
          options={typesOptions[item.column.type]}
          changeValue={changeValue}
          index={index}
          type="condition"
          item={item}
          getOptions={getOptions}
          select={filters[index].condition}
        />
      </FilterItem>
      {item.condition.input && (
        <FilterItem small={!!item.condition.input} trash={filters.length > 1}>
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
              // item={item}
              // getOptions={getOptions}
              select={selectValue}
              isSearchable
            />
            // <SelectFilter
            //   isMulti
            //   select={
            //     selectValue?.value?.length > 0
            //       ? selectValue.value
            //       : filters[index].selectValue
            //   }
            //   onChange={(e) =>
            //     setSelectValue({
            //       value: e,
            //       index,
            //       typeChange: "selectValue",
            //     })
            //   }
            //   options={optionsToMultiSelect[index]}
            //   placeHolder="Valores"
            //   small
            //   item={item}
            //   index={index}
            //   loadingOptions={loadingOptions}
            // />
          )}
        </FilterItem>
      )}
      <TrashButton onClick={() => removeFilter(filters, index)}>
        <TrashIcon />
      </TrashButton>
    </Filter>
  );
}

export default ConditionFilterComponent;
