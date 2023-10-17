/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { components } from "react-select";
import { ReactComponent as ChevronDownIcon } from "../../../../assets/chevron-down-small.svg";
import {
  ContainerNewColumn,
  ContainerOption,
  GhostArrow,
  IconDropDown,
  ValueWidthDropDown,
} from "./styles";
import { NewColumn } from "../../../CustomTable/components/HeaderDropDown/components/NewColumn";
import { useProductContext } from "../../../../context/products";

const CustomOption = (props: any): JSX.Element => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const {
    template,
    headerTable,
    setHeaderTable,
    setColHeaders,
    handleNewColumn,
  } = useProductContext();

  if (!props!.data.openDropdown) return <components.Option {...props} />;
  return (
    <ContainerOption
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
              <NewColumn
                template={template}
                setNewColumn={(newColumn: any, templateUpdated: any) => {
                  // eslint-disable-next-line no-param-reassign
                  newColumn = {
                    ...newColumn,
                    className: "htLeft htMiddle",
                    frozen: false,
                    hidden: false,
                    order: String(headerTable.length + 1),
                    width: "300",
                  };

                  const newPosition = [...headerTable, newColumn];
                  newPosition.splice(newPosition.length - 2, 1);
                  newPosition.push({});
                  setHeaderTable(newPosition);

                  const contentHeaders = headerTable.map((item) => item?.title);
                  contentHeaders.splice(headerTable.length - 1, 1);
                  contentHeaders.push(newColumn?.title);
                  contentHeaders.push(" ");
                  setColHeaders(contentHeaders);
                  handleNewColumn(newColumn, templateUpdated);
                }}
              />
              <GhostArrow />
            </ContainerNewColumn>
          )}
        </ValueWidthDropDown>
      </components.Option>
    </ContainerOption>
  );
};

export default CustomOption;
