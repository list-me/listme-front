import {Form} from "antd";
import React, {createContext, ReactElement, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {productRequests} from "../../services/apis/requests/product";
import {ROUTES} from "../../constants/routes";
import {templateRequests} from "../../services/apis/requests/template";

import {ReactComponent as TextAltIcon} from "../../assets/text-alt.svg";
import {Cell} from "../../components/Cell";

interface IHeaderTable {
    title: ReactElement;
    key: string;
    dataIndex?: string;
    render?: (_:any, record: any) => any;
}

interface ITypeProductContext {
    products: any[];
    handleRedirectAndGetProducts: (template: any) => void;
    headerTable: IHeaderTable[];
}

interface IField {
    id: string;
    type: string;
    group: string;
    title: string;
    options: string[];
    required: boolean;
    help_text: string;
    is_public: string;
    description: string;
}

export const productContext = createContext<ITypeProductContext>({
    products: [],
    handleRedirectAndGetProducts: (template: any) => {},
    headerTable: [],
});

export const ProductContextProvider = ({children}: any) => {
    const [products, setProducts] = useState([]);
    const [template, setTemplate] = useState<any>();
    const [headerTable, setHeaderTable] = useState<IHeaderTable[]>([]);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleGetProducts = (templateId: string) => {
        productRequests.list({page: 0, limit: 4}, templateId).then((response) => {
            const productFields: any = [];
            response?.products?.forEach((item: any) => {
                const values = item?.fields.map((fields: any) => fields);
                productFields.push(...values)
            })

            const test = productFields.map((item: any) => {
                return {
                    [item.id]: item.value
                }
            });

            setProducts(test);
        });
    }

    const handleRedirectAndGetProducts = (id: string) => {
        try {
            handleGetProducts(id);
            handleGetTemplates(id);
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro com sua solicitação de produtos, tente novamente");
        }
    }

    const handleGetTemplates = (templateId: string) => {
        templateRequests
            .get(templateId)
            .then((response) => {
                setTemplate(response)
                const fields = response?.fields;
                const headers = fields?.fields?.map((item: IField): IHeaderTable => {
                    return {
                        key: item.id,
                        title: (
                            <Cell
                                label={item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                                icon={<TextAltIcon />}
                            />
                            // <div>
                            //     <ChevronDownIcon />
                            //     {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                            // </div>
                        ),
                        dataIndex: item.id,
                    }
                });

                console.log({headers})
                setHeaderTable(headers);
        });
    }

    useEffect(() => {

    }, [])

    const value: ITypeProductContext = {
        products,
        handleRedirectAndGetProducts,
        headerTable,
    }

    return <productContext.Provider value={value}> {children} </productContext.Provider>
}
