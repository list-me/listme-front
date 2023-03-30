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
    title?: string;
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
    setColHeaders: Function;
    handleFreeze: Function;
    handleMove: Function;
    handleNewColumn: Function;
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
    handleResize: () => {},
    setColHeaders: () => {},
    handleFreeze: () => {},
    handleMove: () => {},
    handleNewColumn: () => {},
});

export const ProductContextProvider = ({children}: any) => {
    const [products, setProducts] = useState<any[]>([]);
    const [template, setTemplate] = useState<any>();
    const [headerTable, setHeaderTable] = useState<IHeaderTable[]>([]);
    const [colHeaders, setColHeaders] = useState<any[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [hidden, setHidden] = useState<any[]>([]);
    const [customFields, setCustomFields] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

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
            setFilteredData(productFields);
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
        // const fieldsTest = Object.keys(value).filter((item) => {
        //     const element = template.fields?.fields?.find((item) => item?.id == item?.data);
        //     if (element) return item;
        // })

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
                        title: item.title,
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

                const test = headers.sort((a, b) => {
                    return Number(a.order) - Number(b.order)
                })


                const test1 = headers.map((item) => {
                    return item?.title;
                })
                // const test1 = headersCell.sort((a, b) => {
                //     const itemA = headers.find(item => item.title === a);
                //     const itemB = headers.find(item => item.title === b);

                //     return itemA.order - itemB.order;
                // })

                console.log({test, headersCell, test1})

                headersCell = [...test1, ' '];
                headers = [...test,  {}];
                setColHeaders(headersCell);
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
        setCustomFields(prev => {
            return prev.map((item) => {
                if (item?.order == col.toString()) {
                    return {
                        ...item,
                        width: newSize.toString(),
                    }
                }

                return item;
            })
        });

        const custom = buildCustomFields(template.fields.fields, {width: `${newSize.toString()}`}, col);
        templateRequests.customView(template.id, {fields: custom})
            .catch((error) => toast.error("Ocorreu um erro ao alterar o tamanho do campo"));

        return custom;
    }

    const handleHidden = (col: number, template: any, able: boolean): number[] => {
        const content = [...hidden]
        let newValue;
        if (content.includes(col)) {
            newValue = content.filter((element) => element != col)
        } else {
            newValue = [...content, col]
        };

        setHidden(newValue);
        setCustomFields(prev => {
            return prev.map((item) => {
                if (item?.order == col.toString()) {
                    return {
                        ...item,
                        hidden: able,
                    }
                }

                return item;
            })
        });

        const custom = buildCustomFields(template?.fields?.fields, {show: able}, col);
        console.log({custom})
        templateRequests.customView(window.location.pathname.substring(10), {fields: custom})
            .catch((error) => toast.error("Ocorreu um erro ao alterar a visibilidade do campo"));

        return newValue;
    }

    const buildCustomFields = (fields: any, {order, show, width, frozen}: ICustom, col: number) => {
        const testing = [...customFields]

        return testing?.map(custom => {
            if (custom?.order == col) {
                return {
                    id: custom?.id,
                    order: order ? order.toString() : custom?.order,
                    hidden: show !== undefined ? show : custom?.hidden,
                    width: width ? width : custom?.width,
                    frozen: frozen ? frozen : custom?.frozen,
                };
            }
            return custom;
        });
    }

    const handleFreeze = (col: number, state: boolean, operation?: string) => {
        let changeState;
        if (operation && operation == 'unfreeze') {
            changeState = customFields.map((customs) => {
                return {
                    ...customs,
                    frozen: false,
                }
            });

            setCustomFields(changeState);
        } else {
            changeState = customFields.map((customs) => {
                if (Number(customs?.order) <= col) {
                    return {
                        ...customs,
                        frozen: true,
                    }
                }

                return customs;
            })

            setCustomFields(customFields)
        }

        setHeaderTable(prev => {    
            return prev.map((item, index) => {
                return {
                    ...item,
                    width: changeState[index]?.width,
                    order: changeState[index]?.order,
                    frozen: changeState[index]?.frozen,
                    hidden: changeState[index]?.hidden,
                }
            })
        })

        templateRequests.customView(template.id, {fields: changeState})
            .catch((error) => toast.error("Ocorreu um erro ao definir o freeze da coluna"));
        
        return customFields;
    }

    const handleMove = (col: any[]) => {
        const fields = col.filter((item) => {
            if (Object.keys(item).length > 0) return item
        }).map((element) => {
            return {
                order: element?.order,
                hidden: element?.hidden,
                width: element?.width,
                frozen: element?.frozen,
                id: element?.data
            }
        })

        setCustomFields(fields);
        templateRequests.customView(window.location.pathname.substring(10), {fields})
            .catch((error) => toast.error("Ocorreu um erro ao alterar a visibilidade do campo"));
    }

    const handleNewColumn = (col: any, fields: any[]) => {
        const test = [...headerTable, col]
        test.splice(test.length-2 , 1)
        test.push({});

        setHeaderTable(test);

        const newTemplate = template;
        newTemplate.fields.fields = fields;
        setTemplate(newTemplate);

        setCustomFields(prev => [...prev, {order: col?.order, hidden: col?.hidden, width: col?.width, frozen: col?.frozen, id: col?.data}])
    };

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
        handleResize,
        setColHeaders,
        handleFreeze,
        handleMove,
        handleNewColumn
    }

    return <productContext.Provider value={value}> {children} </productContext.Provider>
}
