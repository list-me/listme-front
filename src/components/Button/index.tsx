import React from "react";
import {Container, ButtonCustom} from './styles';
import {IButtonProps} from "./Button.d";

export const Button: React.FC<IButtonProps> = ({ children, isLoading, ...props }) => {
    return(
        <Container>
            <ButtonCustom isLoading={isLoading} {...props}>
                {children}
            </ButtonCustom>
        </Container>
    )
}
