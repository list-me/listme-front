/* eslint-disable */

import React, {createContext, ReactElement, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {productRequests} from "../../services/apis/requests/product";
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
    handleAdd: Function,
    handleSave: Function,
    editing: boolean,
    setEditing: Function
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

const NOT_EDITABLE_CELLS = ['created_at', 'updated_at'];

export const productContext = createContext<ITypeProductContext>({
    products: [],
    handleRedirectAndGetProducts: (template: any) => {},
    headerTable: [],
    handleAdd: () => {},
    handleSave: () => {},
    editing: false,
    setEditing: () => {}
});

export const ProductContextProvider = ({children}: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [template, setTemplate] = useState<any>();
    const [headerTable, setHeaderTable] = useState<IHeaderTable[]>([]);
    const [editing, setEditing] = useState<boolean>(false);


    const handleGetProducts = (templateId: string) => {
        productRequests.list({page: 0, limit: 4}, templateId).then((response) => {
            const productFields: any = [];
            response?.products?.forEach((item: any) => {
                let object: any = {};
                item.fields.forEach((field: any) =>  (object[field.id] = field.value));
                productFields.push({...object, id: item.id, created_at: item.created_at})
            });

            setProducts(productFields);
        });
    }

    const handleRedirectAndGetProducts = (id: string) => {
        try {
            handleGetTemplates(id);
            handleGetProducts(id);
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro com sua solicitação de produtos, tente novamente");
        }
    }

    const handlePost = async (product: any) => {
        await Promise.resolve(productRequests.save(product));
    }

    const handleSave = async (value: any) => {
        let obj: any = [];
        if (value.id) {
            console.log('update')
        } else {
            console.log('insert')
            Object.keys(value).forEach((item: any) => {
                if (value[item]) {
                    obj.push({
                        id: item,
                        value: value[item]
                    })
                }
            });

            const product = {
                product_template_id: window.location.pathname.substring(10),
                is_public: true,
                fields: obj,
                ean: "A0012232"
            };
            await handlePost(product);
        }
        handleGetProducts(window.location.pathname.substring(10));
    }

    const handleAdd = () => {
        const newField = headerTable.map((item: any) => ({ [item.dataIndex]: ""}));
        newField.push({"1": "true"});
        setProducts([newField, ...products]);
    }

    const handleGetTemplates = (templateId: string) => {
        templateRequests
            .get(templateId)
            .then((response) => {
                setTemplate(response)
                const fields = response?.fields;
                const headers = fields?.fields?.map((item: IField) => {
                    if (NOT_EDITABLE_CELLS.includes(item.title)) {
                        return {
                            key: item.id,
                            title: (
                                <Cell
                                    key={item.id}
                                    label={item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                                    icon={<TextAltIcon />}
                                />
                                // <div>
                                //     <ChevronDownIcon />
                                //     {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                                // </div>
                            ),
                            dataIndex: item.id,
                            editable: false
                        }
                    }

                    return {
                        key: item.id,
                        title: (
                            <Cell
                                key={item.id}
                                label={item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                                icon={<TextAltIcon />}
                            />
                            // <div>
                            //     <ChevronDownIcon />
                            //     {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                            // </div>
                        ),
                        dataIndex: item.id,
                        onCell: (record: any) => ({
                            record,
                            editable: true,
                            dataIndex: item.id,
                            title: item.title,
                            handleSave,
                        }),
                        editable: true
                        // key: item.id,
                        // title: (
                        //     <Cell
                        //         label={item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                        //         icon={<TextAltIcon />}
                        //     />
                        //     // <div>
                        //     //     <ChevronDownIcon />
                        //     //     {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                        //     // </div>
                        // ),
                        // dataIndex: item.id,
                    }
                });

                setHeaderTable(headers);
        });
    }

    useEffect(() => {

    }, [])

    const value: ITypeProductContext = {
        products,
        handleRedirectAndGetProducts,
        headerTable,
        handleAdd,
        handleSave,
        editing,
        setEditing
    }

    return <productContext.Provider value={value}> {children} </productContext.Provider>
}
