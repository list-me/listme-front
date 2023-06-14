/* eslint-disable */
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as EllipsisIcon } from "../../assets/ellipsis.svg";
import { ReactComponent as DownloadIcon } from "../../assets/download.svg";
import { ReactComponent as PlusIcon } from "../../assets/add.svg";
import { ReactComponent as ArrowIcon } from "../../assets/arrow-left.svg";
import { ReactComponent as FlagIcon } from "../../assets/icons/flag.svg";
import { ReactComponent as EditIcon } from "../../assets/x-edit.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import {
  Header,
  LeftContent,
  RightContent,
  MoreOptions,
  Container,
  IconTemplate,
  Title,
  Filters,
  Contents,
  Item,
  Content,
  Line,
} from "./styles";
import { ROUTES } from "../../constants/routes";
import Button from "../../components/Button";
import Table from "../../components/CustomTable";
import { productContext } from "../../context/products";
import { Loading } from "../../components/Loading";
import { Temp } from "../../components/Temp";
import { imageContext } from "../../context/images";
import { useDropzone } from "react-dropzone";
import { productRequests } from "../../services/apis/requests/product";

export const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleRedirectAndGetProducts,
    colHeaders,
    setProducts,
    template,
    headerTable,
    filteredData,
    COMPONENT_CELL_PER_TYPE,
  } = useContext(productContext);
  const handleGetProductFiltered = (keyword: string): void => {
    setIsLoading(true);
    try {
      productRequests
        .list({ keyword }, window.location.pathname.substring(10))
        .then((response) => {
          const productFields: any = [];
          response?.products?.forEach((item: any) => {
            const object: any = {};
            item.fields.forEach((field: any) => {
              const currentField = headerTable.find(
                (e: any) => e.data == field.id,
              );

              if (currentField && field.value) {
                const test = !COMPONENT_CELL_PER_TYPE[
                  currentField?.type?.toUpperCase()
                ]
                  ? field?.value[0]
                  : field?.value;

                object[field?.id] = test;
              }
            });
            productFields.push({
              ...object,
              id: item.id,
              created_at: item.created_at,
            });
          });

          if (!productFields.length && template) {
            productFields.push({ [template[0]]: "" });
          }

          setProducts(productFields);
          setIsLoading(false);
        })
        .catch((errr: any) => {
          console.log(errr);
        });
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      handleRedirectAndGetProducts(window.location.pathname.substring(10)).then(
        () => {
          setIsLoading(false);
        },
      );
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      <div
        style={{
          // height: "60%",
          overflow: "inherit",
          flex: 1,
        }}
      >
        <Container>
          {isLoading ? (
            <Loading />
          ) : (
            <Table temp={filteredData} colHeaders={colHeaders} />
          )}
        </Container>
      </div>
    </div>
  );
};
