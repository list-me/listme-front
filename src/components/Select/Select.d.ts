interface ISelect {
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  options: { value: string; label: string }[];
  labelText: string;
  disabledOption: string;
}
