import React, { useState } from "react";

import { MenuProps, GroupBase } from "react-select";

type MenuWithSearchProps = MenuProps<any, false, GroupBase<any>>;

const MenuWithSearch: React.FC<MenuWithSearchProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { options, children, ...rest } = props;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        style={{ width: "100%", padding: "10px" }}
      />
      {/* {React.isValidElement(children)
        ? React.cloneElement(children, { ...rest, options: filteredOptions })
        : null} */}
    </div>
  );
};

export default MenuWithSearch;
