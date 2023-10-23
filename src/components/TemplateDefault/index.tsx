import Sidebar from "../Sidebar";
import { Header } from "../Header";
import { Container, Content } from "./styles";
import { IPaginationTemplate } from "../../pages/templates/templates";

const TemplateDefault = ({
  children,
  handleGetTemplates,
}: {
  children: React.ReactNode;
  handleGetTemplates: ({ page, limit }: IPaginationTemplate) => void;
}): JSX.Element => {
  return (
    <Content>
      <Sidebar />
      <Container>
        <Header handleGetTemplates={handleGetTemplates} />
        {children}
      </Container>
    </Content>
  );
};

export default TemplateDefault;
