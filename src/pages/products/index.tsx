/* eslint-disable */
import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import { Switch } from "antd";
import {ReactComponent as EllipsisIcon} from "../../assets/ellipsis.svg";
import {ReactComponent as DownloadIcon} from "../../assets/download.svg";
import {ReactComponent as PlusIcon} from "../../assets/add.svg";
import {ReactComponent as ArrowIcon} from "../../assets/arrow-left.svg";
import {ReactComponent as FlagIcon} from "../../assets/icons/flag.svg";
import {ReactComponent as EditIcon} from "../../assets/x-edit.svg";
import {ReactComponent as MenuIcon} from "../../assets/menu.svg";
import {ReactComponent as EyeOffIcon} from "../../assets/eye-off.svg";
import {ReactComponent as FilterIcon} from "../../assets/filter.svg";
import {ReactComponent as SearchIcon} from "../../assets/search.svg";
import {ReactComponent as HelpIcon} from "../../assets/help.svg";
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
    Item, Content, Line
} from "./styles";
import {ROUTES} from "../../constants/routes";
import {Button} from "../../components/Button";
import Table from "../../components/CustomTable";
import {productContext} from "../../context/products";
import {Loading} from "../../components/Loading";
import { Temp } from "../../components/Temp";

export const Products = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [valor, setValor] = useState<any>([]);

    const handleSome = () => {
        setIsOpen(!isOpen)
    }

    const {
        products,
        setHeaderTable,
        handleRedirectAndGetProducts,
        handleAdd,
        colHeaders,
        setProducts,
        template,
        headerTable,
        filteredData
    } = useContext(productContext);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true)
        try {
            handleRedirectAndGetProducts(window.location.pathname.substring(10))
                .then(() => {
                    setIsLoading(false);
                })
        } catch (e) {
            setIsLoading(false)
            console.error(e)
        }
    }, []);

    return (
        <Content>
            <Header>
                <LeftContent>
                    <ArrowIcon
                        onClick={() => {
                            setProducts([]);
                            setHeaderTable([]);
                            navigate(ROUTES.TEMPLATES)
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
                    <Button
                        height="52px"
                        width="227px"
                        isSecondary
                    >
                        <DownloadIcon />
                        Importar produtos
                    </Button>
                    <Button
                        height="52px"
                        width="226px"
                        className="secondButton"
                        onClick={handleAdd}
                    >
                        Adicionar produto
                        <PlusIcon />
                    </Button>
                </RightContent>
            </Header>
            <Filters>
                <Temp options={headerTable} />
                <Contents>
                    <Item>
                        <HelpIcon />
                        Ajuda
                    </Item>
                </Contents>
            </Filters>
            <Container>
                {
                    isLoading 
                        ? <Loading />
                        : <Table
                            dataProvider={filteredData}
                            colHeaders={colHeaders}
                        />
                }
            </Container>
        </Content>
    );
}
