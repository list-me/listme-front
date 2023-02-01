import React from "react";
import {Form} from "antd";

export const CustomForm: React.FC<any> = ({
    children,
    onFinish = () => {},
    onClick = () => {},
    layout,
    ...props
}) => {
    return (
        <Form
            style={{
                ...props,
                width: "100%"
            }}

            layout={layout}
            onFinish={onFinish}
            onClick={onClick}
        >
            {children}
        </Form>
    );
}
