import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Input} from "antd";
import {toast} from "react-toastify";
import {CustomForm} from "../../components/Form";
import {
    LoginContainer,
    Background,
    Title,
    InputContainer,
    ButtonContainer,
    BottomContainer,
    ButtonCustom,
    LogoContainer
} from "./styles";

import {ReactComponent as LogoSVG} from "../../assets/logo.svg";
import {ReactComponent as GoogleLogoSVG} from "../../assets/google-logo.svg";
import {Button} from "../../components/Button";
import {CheckboxCustom} from "../../components/Checkbox";
import {authRequests} from "../../services/apis/requests/auth";
import {ROUTES} from "../../constants/routes";
import {STORAGE} from "../../constants/localStorage";
import {Loading} from "../../components/Loading";

export const Login = () => {
    const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        setLoading(!loading)
        try {
            authRequests.login({email, password})
                .then((response) => {
                    window.localStorage.setItem(STORAGE.TOKEN, response?.access_token);
                    toast.success("Login realizado com sucesso");
                    setLoading(false);
                    navigate(ROUTES.TEMPLATES);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error(error)
                    toast.error(error.response.data.message);
                });
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.error(e)
            toast.error("Falha ao processar sua requisição, tente novamente");
        }
    }

    return (
        <Background>
            <LogoContainer>
                <LogoSVG />
            </LogoContainer>
            <LoginContainer>
                <Title>
                    Seja Bem-vindo!
                </Title>
                <CustomForm
                    height="60%"
                    marginTop="4rem"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    padding="2rem"
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
                            rules={[{required: true, message: "O email não pode ser vazio"}]}
                        >
                            <Input
                                style={{height: "40px"}}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Sua senha: "
                            name="password"
                            rules={[{required: true, message: "Insira sua senha"}]}
                        >
                            <Input.Password
                                style={{height: "40px"}}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Form.Item>

                    </InputContainer>
                    <ButtonContainer>
                        <CheckboxCustom
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                            label="Mantenha-me conectado"
                        />
                        {
                            !loading ?
                                <Button
                                    isLoading={loading}
                                >
                                    Login
                                </Button> :
                                <Loading />
                        }
                    </ButtonContainer>
                    <BottomContainer>
                        ou
                        <ButtonCustom>
                            <GoogleLogoSVG />
                            Faça login com o Google
                        </ButtonCustom>
                        Esqueceu sua senha?
                    </BottomContainer>
                </CustomForm>
            </LoginContainer>
        </Background>
);
}
