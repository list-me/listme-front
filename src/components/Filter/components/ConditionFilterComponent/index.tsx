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
  getOptions,
  options,
  optionsToMultiSelect,
  removeFilter,
}: IConditionFilterComponent): JSX.Element {
  console.log("🚀 ~ file: index.tsx:20 ~ filters:", filters[index]);
  const [inputValue, setInputValue] = useState<IInputValue>({} as IInputValue);
  const debouncedInputValue = useDebounce(inputValue, 500);
  const [selectValue, setSelectValue] = useState<IInputValue>({
    index,
    typeChange: "selectValue",
    value: filters[index].selectValue,
  } as IInputValue);

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

  return (
    <Filter
      key={item.id}
      smallBefore={index === 0}
      small={!!item.condition.input}
    >
      <FilterItem>
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
      <FilterItem>
        <SingleSelect
          placeHolder="Condição"
          options={typesOptions[item.column.type]}
          changeValue={changeValue}
          index={index}
          type="condition"
          item={item}
          getOptions={undefined}
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
