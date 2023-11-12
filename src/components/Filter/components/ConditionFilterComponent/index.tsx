import React, { useEffect, useState } from "react";
import { Filter, FilterItem, InputFilter, TrashButton } from "../../styles";
import SelectFilter from "../SelectFilter";
import { ReactComponent as TrashIcon } from "../../../../assets/trash-filter.svg";
import { IInputValue } from "../../../../context/FilterContext/FilterContextType";
import useDebounce from "../../../../hooks/useDebounce/useDebounce";
import SingleSelect from "../SingleSelect";

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
        />
        {/* <SelectFilter
          isSearchable
          select={
            filters[index].column.value ? filters[index].column : undefined
          }
          onChange={(e) => {
            changeValue(e, index, "column");
            getOptions(item, index);
          }}
          options={getColumnOptions(options)}
          placeHolder="Selecione a coluna"
          small
        /> */}
      </FilterItem>
      <FilterItem small={!!item.condition.input} trash={filters.length > 1}>
        <SelectFilter
          isSearchable={false}
          isDisabled={!item.column.type}
          select={
            filters[index].condition.value
              ? filters[index].condition
              : undefined
          }
          onChange={(e) => changeValue(e, index, "condition")}
          options={typesOptions[item.column.type]}
          placeHolder="Condição"
          small
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
            <SelectFilter
              isMulti
              select={
                selectValue?.value?.length > 0
                  ? selectValue.value
                  : filters[index].selectValue
              }
              onChange={(e) =>
                setSelectValue({
                  value: e,
                  index,
                  typeChange: "selectValue",
                })
              }
              options={optionsToMultiSelect[index]}
              placeHolder="Valores"
              small
              item={item}
              index={index}
              loadingOptions={loadingOptions}
            />
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
