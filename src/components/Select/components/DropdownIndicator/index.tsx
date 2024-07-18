/* eslint-disable react/jsx-props-no-spreading */
import { components } from "react-select";
import { ReactComponent as ChevronDown } from "../../../../assets/chevron-down-small.svg";
import { ReactComponent as Search } from "../../../../assets/search-gray.svg";

const makeDropdownIndicator = (additionalProps: any) => {
  return (props: any) => {
    const { isFocused } = props;
    const { isSearchable } = additionalProps;

    return (
      <components.DropdownIndicator {...props}>
        {isFocused && isSearchable ? <Search /> : <ChevronDown />}
      </components.DropdownIndicator>
    );
  };
};

export default makeDropdownIndicator;
