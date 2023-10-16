/* eslint-disable react/jsx-props-no-spreading */
import { components } from "react-select";
import { ReactComponent as ChevronDownIcon } from "../../../../assets/chevron-down-small.svg";
import { IconDropDown, ValueWidthDropDown } from "./styles";

const CustomOption = (props: any): JSX.Element => {
  if (!props!.data.openDropdown) return <components.Option {...props} />;
  return (
    <components.Option {...props}>
      <ValueWidthDropDown>
        <div>{props!.data.value}</div>
        <IconDropDown>
          <ChevronDownIcon />
        </IconDropDown>
      </ValueWidthDropDown>
    </components.Option>
  );
};

export default CustomOption;
