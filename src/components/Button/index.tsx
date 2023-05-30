import React from "react";
import { Container, ButtonCustom } from "./styles";

const Button: React.FC<any> = ({
  children,
  onClickModal,
  isLoading,
  disabled = false,
  ...props
}) => {
  return (
    <Container onClick={onClickModal} disabled>
      <ButtonCustom
        isLoading={isLoading}
        {...props}
        type="submit"
        disabled={disabled}
      >
        {children}
      </ButtonCustom>
    </Container>
  );
};

export default Button;
