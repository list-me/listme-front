import { useLocation } from "react-router-dom";
import DefaultFormIntegration from "../../components/Integration/IntegrationForms/DefaultFormIntegration";
import CharacteriscFormIntegration from "../../components/Integration/IntegrationForms/CharacteriscFormIntegration";

function Integration(): JSX.Element {
  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const pathnameSize = pathnameSplited.length;
  const path = pathnameSplited[pathnameSize - 2];
  if (path !== "product_features") return <DefaultFormIntegration />;
  return <CharacteriscFormIntegration />;
}

export default Integration;
