import {Sidebar} from "../Sidebar";
import {Header} from "../Header";
import {Container, Content} from "./styles";

export const TemplateDefault = ({children}: any) => {
    return (
        <Content>
            <Sidebar />
            <Container>
                <Header />
                {children}
            </Container>
        </Content>
    );
}
