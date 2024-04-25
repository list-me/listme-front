import React from "react";
import {
  ContainerCart,
  CartCount,
  CartValue,
  ContainerCartText,
  CartButton,
} from "./styles";

function Cart({ itemsTotal }: { itemsTotal: number }): JSX.Element {
  const totalPrice = (itemsTotal * 3).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
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
      <CartButton disabled={itemsTotal === 0}>
        {itemsTotal > 0
          ? "Vincular itens selecionados"
          : "Selecione os itens que deseja importar"}
      </CartButton>
    </ContainerCart>
  );
}

export default Cart;
