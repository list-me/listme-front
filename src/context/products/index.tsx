/* eslint-disable */

import React, {createContext, ReactElement, useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";

import {TableField} from "../../components/TableField/index";

import {productRequests} from "../../services/apis/requests/product";
import {templateRequests} from "../../services/apis/requests/template";
import {ReactComponent as TextAltIcon} from "../../assets/text-alt.svg";
import { ICustomCellType } from "./product.context";

export interface ICustomField {
    hidden?: boolean;
    width?: string;
    frozen?: boolean;
    order?: string;
}

export interface ICustom {
    show?: boolean;
    width?: string;
    frozen?: boolean;
    order?: string;
}

export interface IHeaderTable {
    type: string;
    data: string;
    className: string;
    options: string[];
    hidden?: boolean;
    width?: string;
    frozen?: boolean;
    order?: string;
}

interface ITypeProductContext {
    products: any[];
    setProducts: Function,
    handleRedirectAndGetProducts: (template: any) => Promise<void>;
    headerTable: IHeaderTable[];
    setHeaderTable: Function;
    handleAdd: Function;
    handleSave: Function;
    editing: boolean;
    setEditing: Function;
    colHeaders: string[];
    handleDelete: Function;
    COMPONENT_CELL_PER_TYPE: ICustomCellType;
    handleUpdateTemplate: Function;
    template: any;
    hidden: number[];
    handleHidden: Function;
    setHidden: Function;
    handleResize: Function;
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
    order?: string;
    hidden?: boolean;
    width?: string;
    frozen?: boolean;
}

const NOT_EDITABLE_CELLS = ['created_at', 'updated_at'];

export const productContext = createContext<ITypeProductContext>({
    products: [],
    setProducts: () => {},
    handleRedirectAndGetProducts: (): Promise<void> => {return},
    headerTable: [],
    setHeaderTable: () => {},
    handleAdd: () => {},
    handleSave: () => {},
    editing: false,
    setEditing: () => {},
    colHeaders: [],
    handleDelete: () => {},
    COMPONENT_CELL_PER_TYPE: {},
    handleUpdateTemplate: () => {},
    template: {},
    hidden: [],
    handleHidden: () => {},
    setHidden: () => {},
    handleResize: () => {}
});

export const ProductContextProvider = ({children}: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [template, setTemplate] = useState<any>();
    const [headerTable, setHeaderTable] = useState<IHeaderTable[]>([]);
    const [colHeaders, setColHeaders] = useState<any[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [hidden, setHidden] = useState<any[]>([]);
    const [customFields, setCustomFields] = useState([]);

    const COMPONENT_CELL_PER_TYPE: ICustomCellType = {
        RADIO: "radio",
        LIST: "select",
        CHECKED: "checkbox"
    }

    const handleUpdateTemplate = (field: any) => {
    }

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

    const handleGetProducts = async (templateId: string) => {
        return productRequests.list({}, templateId).then((response) => {
            const productFields: any = [];
            response?.products?.forEach((item: any) => {
                let object: any = {};
                item.fields.forEach((field: any) =>  (object[field.id] = field.value));
                productFields.push({...object, id: item.id, created_at: item.created_at})
            });

            if (!productFields.length) {
                productFields.push({[template[0]]: ""})
            }
            setProducts(productFields);
        }).catch((error) => {
            console.error(error);
            toast.error("Não foi possível carregar os produtos, por favor tente novamente!")
        });
    }

    const handleRedirectAndGetProducts = async (id: string) => {
        try {
            await handleGetTemplates(id)
            await handleGetProducts(id)
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
            // handleGetProducts(window.location.pathname.substring(10));
        } catch (error: any) {
            console.error(error.response.data.message[0]);
            toast.error(error.response.data.message)
        }

    }

    const buildProduct = (fields: any) => {
        const obj: any[] = [];
        if (Object.keys(fields).length) {
            Object.keys(fields).forEach((field: any) => {
                if (fields[field] && !["id", "created_at"].includes(field)) {
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

        // let newLine;
        // Object.keys(products[0]).forEach((item: any) => {
        //     if (!["created_at", "id"].includes(item)) {
        //         newLine = {[item]: "", ...newLine};
        //     }
        // })

        // console.log({newLine})

        setProducts((old) => [{}, ...old]);
    }

    const handleGetTemplates = async (templateId: string) => {
        return templateRequests
            .get(templateId)
            .then((response) => {
                setTemplate(response)
                const fields = response?.fields;
                let headersCell: any[] = [];
                var headers = fields?.fields?.map((item: IField, index) => {
                    headersCell.push(item.title);
                    return {
                        data: item.id,
                        className: "htLeft htMiddle",
                        type: item.type,
                        options: item.options,
                        order: item.order ? item.order : index.toString(),
                        hidden: item.hidden ? item.hidden : false,
                        width: item.width ? item.width : "300px",
                        frozen: item.frozen ? item.frozen : false
                    }
                });

                headersCell = [...headersCell, ' '];
                headers = [...headers,  {}];
                setColHeaders(headersCell)
                setHeaderTable(headers);
                setHidden(headers.filter((item) => item.hidden).map((element) => Number(element.order)))
                setCustomFields(headers.filter((element) => {
                    if (Object.keys(element).length) {
                        return element
                    }
                }).map((item) => {
                    const {order, hidden, width, frozen, data} = item;
                    return {order, hidden, width, frozen, id: data}
                }))
                // headers = [];
        }).catch((error) => {
            console.error(error);
            toast.error("Não foi possível carregar o template, tente novamente!")
        });
    }

    const handleResize = (col: number, newSize: number, template: any) => {
        const custom = buildCustomFields(template.fields.fields, {width: `${newSize.toString()}`}, col);
        templateRequests.customView(template.id, {fields: custom})
            .catch((error) => toast.error("Ocorreu um erro ao alterar a visibilidade do campo"));
    }

    const handleHidden = (col: number, template: any, able: boolean) => {
        setHidden((prev) => {
            const content = [...prev]
            let newValue;
            if (content.includes(col)) {
               newValue = content.filter((element) => element != col)
            } else {
                newValue = [...content, col]
            }
            return newValue
        });

        const custom = buildCustomFields(template?.fields?.fields, {show: able}, col);
        // setCustomFields(prev => [...prev, custom])
        // console.log({customFields})
        const test = [...customFields]
        console.log({test, col, custom})
        setCustomFields(custom)
        templateRequests.customView(template.id, {fields: custom})
            .catch((error) => toast.error("Ocorreu um erro ao alterar a visibilidade do campo"))
    }

    const buildCustomFields = (fields: any, {order, show, width, frozen}: ICustom, col: number) => {
        // customFields.map((field) => {
        //     // console.log({field, col})
        //     if (col == field?.order) {
        //         const newField = {
        //             id: field?.id,
        //             order: order ? order.toString() : field.order,
        //             hidden: hidden !== undefined ? show : field?.hidden,
        //             width: width ? width : field?.width,
        //             frozen: frozen ? frozen : false,
        //         }

        const testing = [...customFields]

        // return testing.map((prev) => {
            return testing?.map(custom => {
                if (custom?.order == col) {
                    return {
                        id: custom?.id,
                        order: order ? order.toString() : custom?.order,
                        hidden: show !== undefined ? show : custom?.hidden,
                        width: width ? width : custom?.width,
                        frozen: frozen ? frozen : false,
                    };
                }
                console.log({custom})
                return custom;
            });
            // return updatedField;
        // })
            // }

            // const item = customFields.find((element) => element?.order == col)
            // console.log({item, customFields})
            // if (item) {
            //     return item;
            // }

            // const custom = {
            //     id: field?.id,
            //     order: field?.order,
            //     hidden: field?.hidden,
            //     width: field?.width,
            //     frozen: field?.frozen,
            // };

            // return custom

            // setCustomFields(prev => [...prev, custom])
            // customFields.find((custom) => console.log({custom}))
            // const test = customFields.find((custom) => custom?.order === col)
            // console.log({test})
            // return customFields.find((custom) => custom.order == col)
        // })

        // const custom = customs.find((element) => {
        //     if (col === element?.order) {
        //         return {
        //             id: element?.id,
        //             order: order ? order : element?.order,
        //             hidden: hidden !== undefined ? hidden : element?.hidden,
        //             width: width ? width : element?.width,
        //             frozen: frozen ? frozen : false,
        //         }
        //     }
        // })

    }

    useEffect(() => {
        console.log({customFields})
    }, [customFields])

    const value: ITypeProductContext = {
        products,
        setProducts,
        handleRedirectAndGetProducts,
        headerTable,
        setHeaderTable,
        handleAdd,
        handleSave,
        editing,
        setEditing,
        colHeaders,
        handleDelete,
        COMPONENT_CELL_PER_TYPE,
        handleUpdateTemplate,
        template,
        hidden,
        handleHidden,
        setHidden,
        handleResize
    }

    return <productContext.Provider value={value}> {children} </productContext.Provider>
}
