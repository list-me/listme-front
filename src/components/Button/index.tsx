import React from "react";
import { Container, ButtonCustom } from "./styles";

const Button: React.FC<any> = ({
  children,
  onClickModal,
  isLoading,
  ...props
}) => {
  return (
    <Container onClick={onClickModal}>
      <ButtonCustom isLoading={isLoading} {...props} type="submit">
        {children}
      </ButtonCustom>
    </Container>
  );
};

export default { Button };
