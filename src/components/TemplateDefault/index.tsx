import Sidebar from "../Sidebar";
import { Header } from "../Header";
import { Container, Content } from "./styles";
import { IPaginationTemplate } from "../../pages/templates/templates";

const TemplateDefault = ({
  children,
  handleGetTemplates,
  templates,
}: {
  children: React.ReactNode;
  handleGetTemplates: ({ page, limit }: IPaginationTemplate) => void;
  templates: any;
}): JSX.Element => {
  return (
    <Content>
      <Sidebar />
      <Container>
        <Header handleGetTemplates={handleGetTemplates} templates={templates} />
        {children}
      </Container>
    </Content>
  );
};

export default TemplateDefault;
