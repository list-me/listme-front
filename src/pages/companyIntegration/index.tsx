import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DefaultFormIntegration from "../../components/Integration/IntegrationForms/DefaultFormIntegration";
import CharacteriscFormIntegration from "../../components/Integration/IntegrationForms/CharacteriscFormIntegration";
import { useIntegration } from "../../context/IntegrationContext";
import { ROUTES } from "../../constants/routes";

function Integration(): JSX.Element {
  const { currentProvider } = useIntegration();
  const location = useLocation();
  const pathnameSplited = location.pathname.split("/");
  const path = pathnameSplited[2];
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProvider.id) {
      navigate(`${ROUTES.INTEGRATION}`);
    }
  }, [currentProvider.id, navigate]);

  if (path !== "product_features") return <DefaultFormIntegration />;
  return <CharacteriscFormIntegration />;
}

export default Integration;
