const Select = ({
  select,
  setSelect,
  options,
  labelText,
  disabledOption,
}: ISelect): JSX.Element => {
  return (
    <>
      {labelText && <label htmlFor={labelText}>{labelText}</label>}
      <select
        id={labelText}
        value={select}
        onChange={({ target }) => setSelect(target.value)}
      >
        <option value="" disabled>
          {disabledOption}
        </option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
