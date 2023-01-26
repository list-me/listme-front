import React from "react";
import {Form} from "antd";

export const CustomForm: React.FC<any> = ({children, onFinish = () => {}, layout, ...props}) => {
    return (
        <Form
            style={{
                ...props,
                width: "100%"
            }}

            layout={layout}
            onFinish={onFinish}
        >
            {children}
        </Form>
    );
}
