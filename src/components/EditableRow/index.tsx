import React, {useState} from "react";
import {Form} from "antd";
import {editableContext} from "../../context/editable";
import {EditableRowProps} from "./EditableRow.d";

export const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <editableContext.Provider value={{
                form,
            }}>
                <tr {...props} />
            </editableContext.Provider>
        </Form>
    );
};
