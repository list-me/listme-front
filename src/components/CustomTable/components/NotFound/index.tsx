import React from "react";
import styled from "styled-components";
import laptop from "../../../../assets/images/laptop.png";
import { ButtonFilter, CountFilter, Item } from "../../../Temp/styles";
import { ReactComponent as FilterIcon } from "../../../../assets/filter.svg";
import { useFilterContext } from "../../../../context/FilterContext";
import { useProductContext } from "../../../../context/products";

export const ContainerNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 520px;
  position: absolute;
  top: 0;
  z-index: 8;
  img {
    margin-bottom: 32px;
  }
`;
export const H2NotFound = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.grayscale.primary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.xlarge};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  margin-bottom: 12px;
`;
export const TextNotFound = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.tertiary};
  font-family: ${({ theme }) => theme.fonts.family.default};
  font-size: ${({ theme }) => theme.fonts.sizes.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.regular};
  margin-bottom: 32px;
`;

const NotFound: React.FC = () => {
  const { setOpenedFilter } = useFilterContext();
  const { conditionsFilter } = useProductContext();
  return (
    <ContainerNotFound>
      <img src={laptop} alt="Nenhum resultado encontrado para seu filtro!" />
      <H2NotFound>Nenhum resultado encontrado para seu filtro!</H2NotFound>
      <TextNotFound>
        Explore outras opções de filtro para encontrar o que você procura
      </TextNotFound>
      <ButtonFilter
        filterActive={!!conditionsFilter[0]?.action}
        onClick={() => setOpenedFilter(true)}
      >
        {!!conditionsFilter[0]?.action && (
          <CountFilter>{conditionsFilter.length}</CountFilter>
        )}
        <Item>
          <FilterIcon />
          Filtrar
        </Item>
      </ButtonFilter>
    </ContainerNotFound>
  );
};

export default NotFound;
