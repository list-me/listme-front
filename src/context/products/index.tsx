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
    setProducts: Function,
    handleRedirectAndGetProducts: (template: any) => void;
    headerTable: IHeaderTable[];
    handleAdd: Function,
    handleSave: Function,
    editing: boolean,
    setEditing: Function,
    colHeaders: string[],
    handleDelete: Function
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
    setProducts: () => {},
    handleRedirectAndGetProducts: (template: any) => {},
    headerTable: [],
    handleAdd: () => {},
    handleSave: () => {},
    editing: false,
    setEditing: () => {},
    colHeaders: [],
    handleDelete: () => {}
});

export const ProductContextProvider = ({children}: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [template, setTemplate] = useState<any>();
    const [headerTable, setHeaderTable] = useState<IHeaderTable[]>([]);
    const [colHeaders, setColHeaders] = useState<any[]>([]);
    const [editing, setEditing] = useState<boolean>(false);

    const handleDelete = (product: any) => {
        try {
            const currentProducts = products.filter((itemProduct: any) => {
                if (itemProduct.id !== product.id) {
                    return itemProduct;
                }
            });

            productRequests.delete(product.id).then((response: any) => {
                setProducts(currentProducts);
                toast.success("Produto exlcuido com sucesso");
            }).catch((error) => {
                throw error
            })

        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro na tentativa de deletar este produto");
        }
    }

    const handleGetProducts = (templateId: string) => {
        productRequests.list({page: 0, limit: 4}, templateId).then((response) => {
            const productFields: any = [];
            response?.products?.forEach((item: any) => {
                let object: any = {};
                item.fields.forEach((field: any) =>  (object[field.id] = field.value));
                productFields.push({...object, id: item.id, created_at: item.created_at})
            });

            if (!productFields.length) {
                return handleAdd();
            }
            setProducts(productFields);
        }).catch((error) => {
            console.error(error);
            toast.error("Não foi possível carregar os produtos, por favor tente novamente!")
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
        await Promise.resolve(productRequests.save(product)).catch((error) => {
            throw error
        });;
    }

    const handleSave = async (value: any) => {
        const fields = buildProduct(value);
        try {
            console.log({value, fields})
            if (value?.id) {
                await Promise.resolve(productRequests.update({id: value.id, fields})).catch((error) => {
                    throw error
                });
                return;
            } else {
                const product = {
                    product_template_id: window.location.pathname.substring(10),
                    is_public: true,
                    fields: fields,
                };
                await handlePost(product);
            }
            handleGetProducts(window.location.pathname.substring(10));
        } catch (error: any) {
            console.error(error.response.data.message[0]);
            toast.error(error.response.data.message)
        }

    }

    const buildProduct = (fields: any) => {
        const obj: any[] = [];
        if (Object.keys(fields).length) {
            Object.keys(fields).forEach((field: any) => {
                if (fields[field] && field !== "id") {
                    obj.push({
                        id: field,
                        value: fields[field]
                    });
                }
            });
        }

        return obj;
    }

    const handleAdd = () => {
        if (products.find((product: any) => !Object.keys(product).length)) {
            toast.error("Preencha o novo produto em branco!");
            return;
        }
        setProducts([{}, ...products]);
    }

    const handleGetTemplates = (templateId: string) => {
        templateRequests
            .get(templateId)
            .then((response) => {
                setTemplate(response)
                const fields = response?.fields;
                const headersCell: any[] = [];
                const headers = fields?.fields?.map((item: IField) => {
                    headersCell.push(item.title);
                    return {
                        data: item.id,
                        className: "htLeft htMiddle"
                    }
                });
                setColHeaders(headersCell)
                setHeaderTable(headers);
        }).catch((error) => {
            console.error(error);
            toast.error("Não foi possível carregar o template, tente novamente!")
        });
    }

    const value: ITypeProductContext = {
        products,
        setProducts,
        handleRedirectAndGetProducts,
        headerTable,
        handleAdd,
        handleSave,
        editing,
        setEditing,
        colHeaders,
        handleDelete
    }

    return <productContext.Provider value={value}> {children} </productContext.Provider>
}
