import { Select } from "antd";

interface IOption {
  label: string;
  value: string;
}

interface IProp {
  value: string;
  options: IOption[];
}

const CustomSelect = ({ value, options }: IProp) => {
  const mock = [
    {
      label: "Delete",
      value: "delete",
    },
  ];

  return (
    <>
      <Select value="Ações em massa" options={options} />
    </>
  );
};

export default CustomSelect;
