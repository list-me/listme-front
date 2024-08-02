import React, { useState } from "react";
import {
  Bar,
  ContainerButton,
  ContainerButtonError,
  ContainerContent,
  ContainerModalIA,
  LoadingBar,
  Text,
  TextError,
  TitleButton,
} from "./styles";
import { NavigationButton } from "../../NavigationButton/styles";
import { ReactComponent as ErrorIcon } from "../MenuIA/svgs/erroricon.svg";

const error = false;

function LoadingIA(): JSX.Element {
  const [opened, setOpened] = useState(false);
  return (
    <ContainerModalIA errorMode={error && !opened}>
      <TitleButton onClick={() => setOpened(!opened)}>
        {error && <ErrorIcon />} Aplicando IA...
      </TitleButton>
      {opened && (
        <>
          <ContainerContent>
            <Text>3 de 812 produtos</Text>
            <LoadingBar>
              <Bar />
            </LoadingBar>
          </ContainerContent>
          <ContainerButton>
            <NavigationButton abort>Interromper aplicação</NavigationButton>
          </ContainerButton>
        </>
      )}
      {error && opened && (
        <>
          <hr />
          <TitleButton onClick={() => setOpened(!opened)}>
            Erro ao aplicar IA
          </TitleButton>
          <TextError>
            Aguarde finalizar o carregamento para gerar novo
          </TextError>
          <ContainerContent red>
            <TextError red>
              As linhas 2-91, 96, 104, 203 falharam ao aplicar IA
            </TextError>
          </ContainerContent>
          <ContainerButtonError>
            <NavigationButton>Gerar novamente</NavigationButton>
          </ContainerButtonError>
        </>
      )}
    </ContainerModalIA>
  );
}

export default LoadingIA;
