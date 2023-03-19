import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
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
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down.svg";
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
import DropdownMenu from "../../components/RepDropdownMenu";
import { Temp } from "../../components/Temp";

export const Products = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
        template
    } = useContext(productContext);
    const navigate = useNavigate();


    useEffect(() => {
        setIsLoading(true)
        try {
            handleRedirectAndGetProducts(window.location.pathname.substring(10))
                .then(() => setIsLoading(false))
        } catch (e) {
            setIsLoading(false)
            console.error(e)
        }
    }, [])

    const items = [
        {
            id: 1,
            name: "Visualização",
            icon: <MenuIcon />,
            rightIcon: true
        },
        {
            id: 2,
            name: "Ocultar campos",
            icon: <EyeOffIcon />,
            rightIcon: true,
            // onClick: () => setIsOpen(!isOpen)
        },
        {
            id: 3,
            name: "Filtrar",
            icon: <FilterIcon />,
            rightIcon: false,
        },
        {
            id: 4,
            name: "Buscar",
            icon: <SearchIcon />,
            rightIcon: false,
        },
    ]

    const options = colHeaders.map((item) => {
        return <Line>
            <Switch size="small" />
            <label>{item}</label>
        </Line>
    })

    // const testing = useMemo(() => {
    //     return items.map((item) => {
    //         return (
    //             <Item
    //                 key={item.id}
                    
    //             >
    //                 {item.icon}
    //                 {item.name}
    //                 <ChevronDownIcon ref={iconRef} onClick={handleSome} />
    //             </Item>
    //         )
    //     })
    // }, [])

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
                        // onClick={handleAdd}
                    >
                        Adicionar produto
                        <PlusIcon />
                    </Button>
                </RightContent>
            </Header>
            <Filters>
                <Temp options={colHeaders} />
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
                            dataProvider={products}
                            colHeaders={colHeaders}
                        />
                }
            </Container>
        </Content>
    );
}
