import React, { useState } from "react";
import {
  MainButtonIA,
  SecondaryMenuIA,
  TertiaryMenuIA,
  WrapperMenuIA,
} from "./styles";
import { ReactComponent as StarsIcon } from "./svgs/stars.svg";
import { ReactComponent as LineIcon } from "./svgs/line.svg";
import { ReactComponent as SmallLineIcon } from "./svgs/smallLine.svg";
import { ReactComponent as LargeLineIcon } from "./svgs/LargeLine.svg";
import { useIAContext } from "../../../context/IAContext";

function MenuIA(): JSX.Element {
  const [secondaryOpened, setSecondaryOpened] = useState(false);
  const [tertiaryOpened, setTertiaryOpened] = useState(false);
  const { setModalInformationOpened } = useIAContext();
  return (
    <WrapperMenuIA>
      <MainButtonIA
        onClick={() => {
          setSecondaryOpened((prev) => !prev);
          setTertiaryOpened(false);
        }}
      >
        <StarsIcon />
        Enriquecimento com ajuda da IA
      </MainButtonIA>
      {secondaryOpened && (
        <SecondaryMenuIA>
          <li>
            <button
              type="button"
              onClick={() => setTertiaryOpened((prev) => !prev)}
              className="button"
            >
              <StarsIcon />
              Gerar descrições
            </button>
          </li>
        </SecondaryMenuIA>
      )}
      {tertiaryOpened && (
        <TertiaryMenuIA>
          <li className="liHeader">
            <button
              type="button"
              onClick={() => {
                setModalInformationOpened(true);
                setSecondaryOpened(false);
                setTertiaryOpened(false);
              }}
            >
              Gerar descrições
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setModalInformationOpened(true);
                setSecondaryOpened(false);
                setTertiaryOpened(false);
              }}
              className="button"
            >
              <SmallLineIcon />
              Texto pequeno
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setModalInformationOpened(true);
                setSecondaryOpened(false);
                setTertiaryOpened(false);
              }}
              className="button"
            >
              <LineIcon />
              Texto médio
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setModalInformationOpened(true);
                setSecondaryOpened(false);
                setTertiaryOpened(false);
              }}
              className="button"
            >
              <LargeLineIcon />
              Texto grande
            </button>
          </li>
        </TertiaryMenuIA>
      )}
    </WrapperMenuIA>
  );
}

export default MenuIA;
