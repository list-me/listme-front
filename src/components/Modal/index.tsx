import {IModalProps} from "./Modal.d";
import { CustomModal } from "./styles";

const Modal: React.FC<IModalProps> = ({
  changeVisible,
  isOpen,
  children,
  width
}) => {
  return (
    <>
      <CustomModal
        open={isOpen}
        onCancel={changeVisible}
        footer={false}
        width={width}
        wrapClassName="custom-modal"
        closable={false}
        style={{padding: 0}}
      >
        {children}
      </CustomModal>
    </>
  );
}

export default Modal;