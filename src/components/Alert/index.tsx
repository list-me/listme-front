import { Alert } from "antd";

export const CustomAlert = ({ type, message }: any) => {
  return <Alert closable message={message} type={type} />;
};
