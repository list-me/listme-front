import Sidebar from "../Sidebar";
import { Header } from "../Header";
import { Container, Content } from "./styles";

const TemplateDefault = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Content>
      <Sidebar />
      <Container>
        <Header />
        {children}
      </Container>
    </Content>
  );
};

export default TemplateDefault;
