/* eslint-disable */
import { useEffect, useState } from "react";
import { Form } from "antd";

import {ReactComponent as CloseIcon} from "../../assets/close-gray.svg";
import {ReactComponent as TrashIcon} from "../../assets/trash-white.svg";

import { IPropsConfirmation } from "./Confirmation.d";
import Modal from "../Modal";
import {Input} from "../Input"

import { 
  Button,
  ButtonCotainer,
  Container,
  Content,
  Description,
  Title
} from "./styles";
import { CustomForm } from "../Form";

export const Confirmation: React.FC<IPropsConfirmation> = ({
  pass,
  description,
  title,
  action,
  isOpen,
  handleChangeVisible,
  handleConfirmation
}) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (value) => {
    if (value && value[pass].trim() !== pass) return false;
    handleChangeVisible();

    form.resetFields();
    handleConfirmation();
  }

  const handleChangeValue = (value: string) => 
    (value && value.trim() === pass) ?? setDisabled(false)

  const handleClose = (): void => {
    handleChangeVisible();
    form.resetFields();
  }

  return (
    <Modal
      isOpen={isOpen}
      changeVisible={handleClose}
      width="592px"
    >
      <Content>
        <Title> 
          {title}
          <CloseIcon onClick={handleClose} />
        </Title>
        <Container>
          <Description> <b>Atenção!</b> {description} </Description>
          <Form
            form={form}
            onFinish={handleSubmit}
          >
            <Input
              bordered
              label={`Para confirmar digite a palavra  `}
              name={pass}
              type="text"
              width="482px"
              height="64px"
              placeholder={pass}
              background={false}
              validation={{matchWord: pass}}
              padding="20px"
              // handleCustomChange={handleChangeValue}
            />
            <ButtonCotainer>
              <Button
                backgroundColor="#E9ECEF"
                color="#868E96"
                type="button"
                onClick={handleClose}
              > Cancel
              </Button>
              <Button
                backgroundColor="#FA5252"
                color="#FFFF"
                // type="submit"
              >
                <TrashIcon />
                Excluir
              </Button>
            </ButtonCotainer>
          </Form>
        </Container>
      </Content>
    </Modal>
  );
}