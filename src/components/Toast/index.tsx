import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastWrapStyled } from "./styles";

export const Toast = ({ ...props }) => {
  return (
    <ToastWrapStyled>
      <ToastContainer
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </ToastWrapStyled>
  );
};
