import { useEffect, useState } from "react";
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

  useEffect(() => {
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

  useEffect(() => {
    if (filters.length === 1 && !filters[0].column.value) {
      setInputValue({} as IInputValue);
      setSelectValue({} as IInputValue);
    }
  }, [filters]);

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
    <Filter
      key={item.id}
      smallBefore={index === 0}
      small={!!item.condition.input}
      trash={filters.length > 1}
    >
      <FilterItem>
        <SingleSelect
          placeHolder="Selecione a coluna"
          options={getColumnOptions(options)}
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
            console.log(item);
            removeFilter(filters, index, item.column.type);
          }}
        >
          <TrashIcon />
        </TrashButton>
      )}
    </Filter>
  );
}

export default ConditionFilterComponent;
