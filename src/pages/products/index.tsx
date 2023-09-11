import { useContext, useEffect, useState } from "react";

import { Container, Content } from "./styles";
import Table from "../../components/CustomTable";
import { productContext } from "../../context/products";
import { Loading } from "../../components/Loading";

export const Products = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleRedirectAndGetProducts, products } = useContext(productContext);

  useEffect(() => {
    setIsLoading(true);
    handleRedirectAndGetProducts(window.location.pathname.substring(10)).then(
      () => {
        setIsLoading(false);
      },
    );
  }, []);

  return (
    <>
      <Content>
        <Container>
          {isLoading ? <Loading /> : <Table data={products} />}
        </Container>
      </Content>
    </>
  );
};
