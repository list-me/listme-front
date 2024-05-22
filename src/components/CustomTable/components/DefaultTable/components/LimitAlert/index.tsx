import React, { useEffect } from "react";
import { ContainerLimitAlert } from "./styles";

function LimitAlert({
  coordX,
  coordY,
  text,
  setCoordsLimitAlert,
}: {
  coordX: number;
  coordY: number;
  text: string;
  setCoordsLimitAlert: React.Dispatch<
    React.SetStateAction<{
      coordX: number;
      coordY: number;
      text: string;
    }>
  >;
}): JSX.Element {
  return (
    <ContainerLimitAlert
      coordX={coordX}
      coordY={coordY}
      onClick={() => {
        setCoordsLimitAlert({
          coordX: 0,
          coordY: 0,
          text: "",
        });
      }}
    >
      <p>{text}</p>
    </ContainerLimitAlert>
  );
}

export default LimitAlert;
