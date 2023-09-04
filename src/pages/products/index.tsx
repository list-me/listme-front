/* eslint-disable */

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as EllipsisIcon } from "../../assets/ellipsis.svg";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";
import { ReactComponent as PlusIcon } from "../../assets/add.svg";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-left.svg";
import { ReactComponent as FlagIcon } from "../../assets/icons/flag.svg";
import { ReactComponent as EditIcon } from "../../assets/x-edit.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";

import {
  Container,
  Content,
  Contents,
  Filters,
  Header,
  IconTemplate,
  Item,
  LeftContent,
  MoreOptions,
  RightContent,
  Title,
} from "./styles";
import Table from "../../components/CustomTable";
import { productContext } from "../../context/products";
import { Loading } from "../../components/Loading";
import Button from "../../components/Button";
import { Temp } from "../../components/Temp";
import { ROUTES } from "../../constants/routes";
import { templateRequests } from "../../services/apis/requests/template";

export const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const navigate = useNavigate();

  const {
    handleRedirectAndGetProducts,
    products,
    template,
    headerTable,
    handleGetProductsFiltered,
    handleAdd,
  } = useContext(productContext);

  useEffect(() => {
    console.log("Renderizado Product");
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

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       overflow: "hidden",
  //       height: "100vh",
  //     }}
  //   >
  //     <div
  //       style={{
  //         // height: "60%",
  //         overflow: "inherit",
  //         flex: 1,
  //       }}
  //     >
  //     </div>
  //   </div>
  // );
};
