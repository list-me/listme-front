/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { components } from "react-select";
import { ReactComponent as ChevronDownIcon } from "../../../../assets/chevron-down-small.svg";
import {
  ContainerNewColumn,
  GhostArrow,
  IconDropDown,
  ValueWidthDropDown,
} from "./styles";
import { NewColumn } from "../../../CustomTable/components/HeaderDropDown/components/NewColumn";

const CustomOption = (props: any): JSX.Element => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  if (!props!.data.openDropdown) return <components.Option {...props} />;
  return (
    <div
      onMouseEnter={() => {
        setDropdownOpen(true);
      }}
      onMouseLeave={() => {
        setDropdownOpen(false);
      }}
    >
      <components.Option {...props}>
        <ValueWidthDropDown>
          <div>{props!.data.value}</div>
          <IconDropDown>
            <ChevronDownIcon />
          </IconDropDown>
          {isDropdownOpen && (
            <ContainerNewColumn>
              <NewColumn template={undefined} setNewColumn={() => ""} />
              <GhostArrow />
            </ContainerNewColumn>
          )}
        </ValueWidthDropDown>
      </components.Option>
    </div>
  );
};

export default CustomOption;
