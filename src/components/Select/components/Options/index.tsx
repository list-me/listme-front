/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */

import React from "react";
import { ContainerOption, FixedOptions } from "./styles";

const CustomMenuList = (props: any) => {
  const childrenArray = React.Children.toArray(props.children);
  const regularOptions = childrenArray.slice(0, -2);
  const lastTwoOptions = childrenArray.slice(-2);

  return (
    <ContainerOption>
      <div style={{ overflowY: "auto", maxHeight: "200px", padding: "8px" }}>
        {regularOptions}
      </div>
      <FixedOptions>{lastTwoOptions}</FixedOptions>
    </ContainerOption>
  );
};

export default CustomMenuList;
