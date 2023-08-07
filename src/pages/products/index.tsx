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
        <Header>
          <LeftContent>
            <ArrowIcon
              onClick={() => {
                // setDataProvider([]);
                // setHeaderTable([]);
                // setFilteredData([]);
                // setColumns([]);
                navigate(ROUTES.TEMPLATES);
              }}
            />
            <IconTemplate>
              <FlagIcon />
            </IconTemplate>
            <Title> {template?.name} </Title>
            <EditIcon />
          </LeftContent>
          <RightContent>
            <MoreOptions>
              <EllipsisIcon />
            </MoreOptions>
            <Button height="52px" width="227px" isSecondary>
              <DownloadIcon />
              Importar produtos
            </Button>
            <Button
              height="52px"
              width="226px"
              className="secondButton"
              onClick={() => {
                //Adicionar função de nova linha em branco via context
                // const { hotInstance } = hotRef.current!;
                // if (hotInstance) {
                //   if (hotInstance.isEmptyRow(0))
                //     return toast.warn("Preencha o produto atual");
                // }
                // setDataProvider((prev) => [{}, ...prev]);
              }}
            >
              Adicionar produto
              <PlusIcon />
            </Button>
          </RightContent>
        </Header>
        <Filters>
          <Temp
            options={headerTable}
            handleSearch={handleGetProductsFiltered}
          />
          <Contents>
            <Item>
              <HelpIcon />
              Ajuda
            </Item>
          </Contents>
        </Filters>
      </Content>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <Container>
          {isLoading ? <Loading /> : <Table data={products} />}
        </Container>
      </div>
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
