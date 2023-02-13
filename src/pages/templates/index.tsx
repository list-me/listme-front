import React, {ReactComponentElement, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Space, Table, Tag} from "antd";
import {TableRowSelection} from "antd/es/table/interface";
import {Sidebar} from "../../components/Sidebar";
import {Header} from "../../components/Header";
import {TitlePage, Container, Content, Capsule} from "./styles";
import {Button} from "../../components/Button";
// @ts-ignore
import { ReactComponent as AddIcon} from '../../assets/add-secondary.svg';
// @ts-ignore
import { ReactComponent as EditIcon} from "../../assets/edit-icon.svg"
// @ts-ignore
import { ReactComponent as CopyIcon} from "../../assets/copy-icon.svg";
// @ts-ignore
import { ReactComponent as TrashIcon} from "../../assets/trash-icon.svg";
import {CustomTable} from "../../components/Table/index";
import {CustomModal} from "../../components/Modal";
import {templateRequests} from "../../services/apis/requests/template";
import {TemplateDefault} from "../../components/TemplateDefault";
import Select from "../../components/Select";

export const Template = () => {
    const [templates, setTemplates] = useState();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const navigate = useNavigate();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handleGetTemplates = () => {
        templateRequests.list({}).then((response) => {
            setTemplates(response)
        }).catch((error) => {
            console.error(error);
        })
    }

    const rowSelection: TableRowSelection<any> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleClick = (record: any, rowIndex: number | undefined): void => {
        console.log(record)
    }

    const data = [
        {
            "order": 1,
            "id": "b5ab6521-1226-4323-8bc6-21100274e715",
            "name": "Minimal",
            "fields": {
                "fields": [
                    {
                        "id": "574854",
                        "type": "radio",
                        "group": "destralhe",
                        "title": "financeiro",
                        "options": [
                            "eco",
                            "gastanca"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "679008",
                        "type": "paragraph",
                        "group": "educacao",
                        "title": "vida",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "921630",
                        "type": "list",
                        "group": "destralhe",
                        "title": "saude",
                        "options": [
                            "treino",
                            "calistenia"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "843398",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo1",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "175594",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo2",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "789940",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo3",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "905161",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo4",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "475645",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo5",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "201228",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo6",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "738610",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo7",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "945170",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo8",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "413223",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo9",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "542372",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo10",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "752143",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo11",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "408520",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo12",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    }
                ],
                "groups": [
                    "destralhe",
                    "higiene do sono",
                    "educacao"
                ]
            },
            "created_at": "01-02-2023",
            "updated_at": "-",
            "total": "1",
            "is_public": true
        },
        {
            "order": 2,
            "id": "0e5a11e1-b801-4efe-983a-ffcd6a5131ce",
            "name": "Template 2",
            "fields": {
                "fields": [
                    {
                        "id": "854612",
                        "type": "radio",
                        "group": "destralhe",
                        "title": "financeiro",
                        "options": [
                            "eco",
                            "gastanca"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "659619",
                        "type": "paragraph",
                        "group": "educacao",
                        "title": "vida",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "194616",
                        "type": "list",
                        "group": "destralhe",
                        "title": "saude",
                        "options": [
                            "treino",
                            "calistenia"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "560972",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo1",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "411559",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo2",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "773512",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo3",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "793130",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo4",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "814117",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo5",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "157213",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo6",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "603763",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo7",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "270746",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo8",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "221087",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo9",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "954883",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo10",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "413616",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo11",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "601059",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo12",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    }
                ],
                "groups": [
                    "destralhe",
                    "higiene do sono",
                    "educacao"
                ]
            },
            "created_at": "06-02-2023",
            "updated_at": "-",
            "total": "0",
            "is_public": null
        },
        {
            "order": 3,
            "id": "d1d998da-6964-4b2e-9ae8-2df6884103e0",
            "name": "Minimal1",
            "fields": {
                "fields": [
                    {
                        "id": "214608",
                        "type": "radio",
                        "group": "destralhe",
                        "title": "financeiro",
                        "options": [
                            "eco",
                            "gastanca"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "798782",
                        "type": "paragraph",
                        "group": "educacao",
                        "title": "vida",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "400843",
                        "type": "list",
                        "group": "destralhe",
                        "title": "saude",
                        "options": [
                            "treino",
                            "calistenia"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "884514",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo1",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "450327",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo2",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "412008",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo3",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "300422",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo4",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "985417",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo5",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "967460",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo6",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "370550",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo7",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "926986",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo8",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "416096",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo9",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "997730",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo10",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "758358",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo11",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "915713",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo12",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    }
                ],
                "groups": [
                    "destralhe",
                    "higiene do sono",
                    "educacao"
                ]
            },
            "created_at": "06-02-2023",
            "updated_at": "-",
            "total": "0",
            "is_public": null
        },
        {
            "order": 4,
            "id": "e6fbfba1-4041-4274-a553-253254c8f281",
            "name": "Template 3",
            "fields": {
                "fields": [
                    {
                        "id": "540661",
                        "type": "radio",
                        "group": "destralhe",
                        "title": "financeiro",
                        "options": [
                            "eco",
                            "gastanca"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "228927",
                        "type": "paragraph",
                        "group": "educacao",
                        "title": "vida",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "327139",
                        "type": "list",
                        "group": "destralhe",
                        "title": "saude",
                        "options": [
                            "treino",
                            "calistenia"
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "938820",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo1",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "556969",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo2",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "180167",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo3",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "385692",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo4",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "995412",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo5",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "269076",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo6",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "137355",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo7",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "245889",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo8",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "112701",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo9",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "449750",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo10",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": false,
                        "description": "Completly random description"
                    },
                    {
                        "id": "946415",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo11",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    },
                    {
                        "id": "690833",
                        "type": "text",
                        "group": "destralhe",
                        "title": "titulo12",
                        "options": [
                            ""
                        ],
                        "required": true,
                        "help_text": "This fiedl will help you to make a new product register",
                        "is_public": true,
                        "description": "Completly random description"
                    }
                ],
                "groups": [
                    "destralhe",
                    "higiene do sono",
                    "educacao"
                ]
            },
            "created_at": "08-02-2023",
            "updated_at": "-",
            "total": "0",
            "is_public": null
        }
    ]

    const columns = [
        {
            title: "ID",
            key: "order",
            dataIndex: "order",
            width: "5%",
            render: (_:any, record: any) => {
                return (
                    <label style={{color: "#212529"}}> {record.order} </label>
                );
            }
        },
        {
            title: "Nome",
            key: "name",
            dataIndex: "name",
            width: "55%",
            render: (_:any, record: any) => {
                return (
                    <label style={{color: "#212529"}}> {record.name} </label>
                );
            }
        },
        {
            title: "Produtos",
            key: "total",
            dataIndex: "total",
            width: "5%",
            align: "center",
            render: (_:any, record: any) => {
                return (
                    <label style={{color: "#3818D9"}}> {record.total} </label>
                );
            }
        },
        {
            title: "Criado em",
            key: "created_at",
            dataIndex: "created_at",
            width: "13%",
            align: "center"
        },
        {
            title: "Última edição",
            key: "updated_at",
            dataIndex: "updated_at",
            width: "15%",
            align: "center",
        },
        {
            title: "Visibilidade",
            key: "is_public",
            dataIndex: "is_public",
            width: "10%",
            align: "center",
            render: (_: any, record: any) => {
                const background = record.is_public ? "#3818D9" : "#DEE2E6";
                const color = record.is_public ? "#FFFFFF" : "#212529";
                return (
                    <Tag
                        color={background}
                        style={{
                            color,
                            padding: "4px 8px",
                            width: "64px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontFamily: '"Satoshi Bold", sans-serif',
                            fontWeight: 700
                    }}
                    >
                        {record.is_public ? "Público" : "Privado"}
                    </Tag>
                )
            }
        },
        {
            title: "Ações",
            key: "action",
            width: "15%",
            align: "center",
            render: () => (
              <Space
                  size="large"
              >
                  <span className="actionButtons">
                      <EditIcon />
                  </span>
                  <span className="actionButtons">
                    <CopyIcon />
                  </span>
                  <span className="actionButtons">
                      <TrashIcon />
                  </span>
              </Space>
            ),
        },
    ];

    useEffect(() => {
        handleGetTemplates()
        console.log("reiniciei")
    }, [modalIsOpen])

    return (
        <TemplateDefault>
            <CustomModal
                isOpen={modalIsOpen}
                onClickModal={() => setModalIsOpen(!modalIsOpen)}
            />
            <Content>
                <TitlePage> Templates </TitlePage>
                <CustomTable
                    columns={columns}
                    dataProvider={templates}
                    size="large"
                    rowSelection={rowSelection}
s                >
                    <Select />
                </CustomTable>
            </Content>
        </TemplateDefault>
    );
}
