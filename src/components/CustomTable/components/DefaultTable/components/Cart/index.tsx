import { useLocation } from "react-router-dom";
import {
  ContainerCart,
  CartCount,
  CartValue,
  ContainerCartText,
  CartButton,
} from "./styles";
import { useFromToContext } from "../../../../../../context/FromToContext";

function Cart({ itemsTotal }: { itemsTotal: number }): JSX.Element {
  const totalPrice = (itemsTotal * 3).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const location = useLocation();

  const isOutsidePage = location.pathname.includes("outside");

  const { setFromToIsOpened, setCurrentStep, setStepType, setAllRowsSelected } =
    useFromToContext();

  return (
    <ContainerCart>
      <ContainerCartText>
        <CartCount>
          {itemsTotal > 0
            ? `${itemsTotal} itens selecionados`
            : "Selecione os itens que deseja vincular"}
        </CartCount>
        <CartValue>{itemsTotal > 0 ? totalPrice : "R$ 0,00"}</CartValue>
      </ContainerCartText>
      <CartButton
        disabled={itemsTotal === 0}
        onClick={() => {
          setStepType(isOutsidePage ? "publicListOutside" : "publicList");
          setCurrentStep(2);
          setFromToIsOpened(true);
          setAllRowsSelected(false);
        }}
      >
        {itemsTotal > 0
          ? "Vincular itens selecionados"
          : "Selecione os itens que deseja importar"}
      </CartButton>
    </ContainerCart>
  );
}

export default Cart;
