import { useEffect } from "react";
import {
  ButtonAction,
  CardAction,
  ContainerActions,
  ContainerInitialStep,
} from "./styles";

// @ts-ignore
import guitar from "../../../../assets/images/guitar.png";
// @ts-ignore
import cloud from "../../../../assets/images/cloud.png";
import { useFromToContext } from "../../../../context/FromToContext";

function InitialStep(): JSX.Element {
  const { setCurrentStep, setStepType } = useFromToContext();

  useEffect(() => {
    setStepType("fromTo");
  }, [setStepType]);

  return (
    <ContainerInitialStep>
      <p>
        Aqui você pode importar produtos para o seu catálogo. Os produtos podem
        ser importador de duas maneiras:
      </p>
      <ul>
        <li>
          <span>Lists Públicas</span> (já existem em nossa base de dados e estão
          disponíveis para todos)
        </li>
        <li>
          <span>Importar Arquivo</span> (você pode importar produtos de um
          arquivo direto do seu computador)
        </li>
      </ul>
      <ContainerActions>
        <CardAction>
          <img src={guitar} alt="Vincular List pública" />
          <ButtonAction
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
              setStepType("publicList");
            }}
          >
            Vincular List pública
          </ButtonAction>
        </CardAction>
        <CardAction>
          <img src={cloud} alt="Importar arquivo" />
          <ButtonAction
            onClick={() => {
              setCurrentStep((prev) => prev + 1);
              setStepType("fromTo");
            }}
          >
            Importar arquivo
          </ButtonAction>
        </CardAction>
      </ContainerActions>
    </ContainerInitialStep>
  );
}

export default InitialStep;
