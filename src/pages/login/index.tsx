import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { toast } from "react-toastify";
import { CustomForm } from "../../components/Form";
import {
  LoginContainer,
  Background,
  Title,
  InputContainer,
  ButtonContainer,
  BottomContainer,
  ButtonCustom,
  LogoContainer,
} from "./styles";

import { ReactComponent as LogoSVG } from "../../assets/logo.svg";
import { ReactComponent as GoogleLogoSVG } from "../../assets/google-logo.svg";
import Button from "../../components/Button";
import { CheckboxCustom } from "../../components/Checkbox";
import { authRequests } from "../../services/apis/requests/auth";
import { ROUTES } from "../../constants/routes";
import { STORAGE } from "../../constants/localStorage";
import { Loading } from "../../components/Loading";

export const Login = () => {
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    setLoading(!loading);
    try {
      authRequests
        .login({
          email: email.toLowerCase(),
          password,
        })
        .then((response) => {
          window.localStorage.setItem(STORAGE.TOKEN, response?.access_token);
          toast.success("Login realizado com sucesso");
          setLoading(false);
          navigate(ROUTES.TEMPLATES);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          toast.error(error?.response?.data?.message);
        });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error(e);
      toast.error("Falha ao processar sua requisição, tente novamente");
    }
  };

  return (
    <Background>
      <LogoContainer>
        <LogoSVG />
      </LogoContainer>
      <LoginContainer>
        <Title>Seja bem-vindo de volta!</Title>
        <CustomForm
          height="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          layout="vertical"
          onFinish={(e: any) => {
            handleSubmit(e);
            setLoading(!loading);
          }}
        >
          <InputContainer>
            <Form.Item
              label="Seu email: "
              name="email"
              rules={[
                { required: true, message: "Email inválido", type: "email" },
              ]}
            >
              <Input
                style={{
                  height: "64px",
                  border: "1px solid #DEE2E6",
                }}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Senha: "
              name="password"
              rules={[{ required: true, message: "Insira sua senha" }]}
            >
              <Input.Password
                style={{
                  height: "64px",
                  border: "1px solid #DEE2E6",
                }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
          </InputContainer>
          <ButtonContainer>
            <CheckboxCustom
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              label="Mantenha-me conectado"
            />
            {!loading ? (
              <Button isLoading={loading} height="60px">
                Login
              </Button>
            ) : (
              <Loading />
            )}
          </ButtonContainer>
        </CustomForm>
        <BottomContainer>
          ou
          <ButtonCustom>
            <GoogleLogoSVG />
            Faça login com o Google
          </ButtonCustom>
          Esqueceu sua senha?
        </BottomContainer>
      </LoginContainer>
    </Background>
  );
};
