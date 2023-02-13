import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
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
    Item, Content
} from "./styles";
import {ROUTES} from "../../constants/routes";
import {Button} from "../../components/Button";
import Table from "../../components/CustomTable";
import {productContext} from "../../context/products";

export const Products = () => {
    const {products, headerTable, handleRedirectAndGetProducts} = useContext(productContext);

    const navigate = useNavigate();

    useEffect(() => {
        handleRedirectAndGetProducts(window.location.pathname.substring(10))
    }, [])

    const items = [
        {
            name: "Visualização",
            icon: <MenuIcon />,
            rightIcon: true
        },
        {
            name: "Ocultar campos",
            icon: <EyeOffIcon />,
            rightIcon: true
        },
        {
            name: "Filtrar",
            icon: <FilterIcon />,
            rightIcon: false
        },
        {
            name: "Buscar",
            icon: <SearchIcon />,
            rightIcon: false
        },
    ]

    return (
        <Content>
            <Header>
                <LeftContent>
                    <ArrowIcon
                        onClick={() => navigate(ROUTES.TEMPLATES)}
                    />
                    <IconTemplate>
                        <FlagIcon />
                    </IconTemplate>
                    <Title> Louças </Title>
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
                    >
                        Adicionar produto
                        <PlusIcon />
                    </Button>
                </RightContent>
            </Header>
            <Filters>
                <Contents>
                    {items.map((item) => {
                        return (
                            <Item>
                                {item.icon}
                                {item.name}
                                {item.rightIcon ? <ChevronDownIcon /> : <> </>}
                            </Item>
                        )
                    })}
                </Contents>
                <Contents>
                    <Item>
                        <HelpIcon />
                        Ajuda
                    </Item>
                </Contents>
            </Filters>
            <Container>
                <Table
                    dataProvider={products}
                    columns={headerTable}
                    bordered
                />
            </Container>
        </Content>
    );
}
