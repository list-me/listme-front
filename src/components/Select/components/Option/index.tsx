/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { components } from "react-select";
import { useState } from "react";
import { ReactComponent as ChevronDownIcon } from "../../../../assets/chevron-down-small.svg";
import {
  ContainerNewColumn,
  ContainerOption,
  GhostArrow,
  IconDropDown,
  ValueWidthDropDown,
} from "./styles";

const CustomOption = (AdditionalComponent: any): JSX.Element => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // @ts-ignore
  return (props: any) => {
    if (!props!.data.openDropdown) return <components.Option {...props} />;
    return (
      <>
        <ContainerOption
          onMouseEnter={() => {
            setDropdownOpen(true);
          }}
          onMouseLeave={() => {
            setDropdownOpen(false);
          }}
        >
          <components.Option
            {...props}
            onClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <ValueWidthDropDown>
              <div>{props!.data.value}</div>
              <IconDropDown>
                <ChevronDownIcon />
              </IconDropDown>
            </ValueWidthDropDown>

            {isDropdownOpen && (
              <ContainerNewColumn>
                <AdditionalComponent />
                <GhostArrow />
              </ContainerNewColumn>
            )}
          </components.Option>
        </ContainerOption>
      </>
    );
  };
};

export default CustomOption;
