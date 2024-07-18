/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */

import React, { useEffect, useState } from "react";
import { ContainerOption, FixedOptions } from "./styles";

const CustomMenuList = (props: any) => {
  const childrenArray = React.Children.toArray(props.children);

  const regularOptions = childrenArray.slice(0, -2);

  const lastTwoOptions = childrenArray.slice(-2);

  const [isMenuUp, setIsMenuUp] = useState(false);

  useEffect(() => {
    const handleMenuPosition = (): void => {
      const selectMenu = document.querySelector(".containerOption");
      const rect = selectMenu?.getBoundingClientRect();

      if (rect && window.innerHeight - rect.bottom < 100) {
        setIsMenuUp(true);
      } else {
        setIsMenuUp(false);
      }
    };

    handleMenuPosition();
  }, []);

  return (
    <ContainerOption isMenuUp={isMenuUp} className="containerOption">
      <div style={{ overflowY: "auto", maxHeight: "200px", padding: "8px" }}>
        {regularOptions}
      </div>
      <FixedOptions>{lastTwoOptions}</FixedOptions>
    </ContainerOption>
  );
};

export default CustomMenuList;
