/* eslint-disable */
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {Input, Form} from "antd";
import {EditableCellProps} from "./EditableCell.d";
import type { InputRef } from "antd";
import {editableContext} from "../../context/editable";

export const EditableCell: React.FC<EditableCellProps> = ({
       title,
       editable,
       children,
       dataIndex,
       record,
       handleSave,
       key,
       ...restProps
   }) => {
    // const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const {form, editing, setEditing} = useContext(editableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const handleFocus = useCallback((e: any) => {
        if (editing) {
            const id = e.target.id;
            console.log(e.target)
            inputRef.current!.focus();
        }
    }, [editing])

    const toggleEdit = () => {
        setEditing(!editing);
        form!.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async (e: any) => {
        e.preventDefault();
        try {
            console.log(e)
            const values = await form!.validateFields();
            toggleEdit();
            await handleSave({...values});
            record = {}
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    let isNew;
    if (record?.length > 1) {
        isNew = record.find((item: any) => item["1"] === "true");
    }

    if (editable || isNew) {
        if (editing || isNew) {
            childNode = (
                <Form.Item
                    style={{ margin: 0 }}
                    name={dataIndex}
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: `${title} is required.`
                    //     }
                    // ]}
                >
                    <Input ref={inputRef} onPressEnter={save} />
                </Form.Item>
            );
        } else {
            childNode = (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }
    }

    return <td {...restProps}>{childNode}</td>;
};
