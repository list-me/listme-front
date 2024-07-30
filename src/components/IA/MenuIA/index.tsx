import React, { useState } from "react";
import {
  MainButtonIA,
  SecondaryMenuIA,
  TertiaryMenuIA,
  WrapperMenuIA,
} from "./styles";
import { ReactComponent as StarsIcon } from "./svgs/stars.svg";
import { ReactComponent as DocIcon } from "./svgs/doc.svg";
import { ReactComponent as LineIcon } from "./svgs/line.svg";
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
            >
              <DocIcon />
              Enriquecimento de descrição dos produtos por IA
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
            >
              <LineIcon />
              Melhorar título dos produtos por IA
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
              Enriquecimento
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
            >
              <DocIcon />
              Gerar descrições inexistentes
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
            >
              <LineIcon />
              Melhorar descrições
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
            >
              <LineIcon />
              Reescrever com outro tom de voz
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
            >
              <LineIcon />
              Reduzir texto(s)
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
            >
              <LineIcon />
              Aumentar texto(s)
            </button>
          </li>
        </TertiaryMenuIA>
      )}
    </WrapperMenuIA>
  );
}

export default MenuIA;
