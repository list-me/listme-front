import { Modal } from "antd";
import {IModalProps} from "./Modal.d";

const CustomModal: React.FC<IModalProps> = ({
  changeVisible = () => {},
  isOpen
}) => {
  return (
    <>
      <Modal
        visible
        open={isOpen}
        // onCancel={changeVisible}
        // onOk={changeVisible}
      />
    </>
  );
}

export default CustomModal;