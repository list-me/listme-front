import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { STORAGE } from "../constants/localStorage";

const PrivateRoutes: React.FC = () => {
  const token = !!window.localStorage.getItem(STORAGE.TOKEN);
  const isAuthenticated = !!token;

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.BASE} />;
};

export default PrivateRoutes;
