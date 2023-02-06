import React from "react";
import {Form} from "antd";
import {Container} from "./styles";

export const CustomForm: React.FC<any> = ({
    children,
    onFinish = () => {},
    onClick = () => {},
    layout,
    ...props
}) => {
    return (
        <Container>
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
        </Container>
    );
}
