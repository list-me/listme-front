import { Modal } from "antd";
import { ICardProps } from "./Card.d";
import { Container } from "./styles";

export const Card: React.FC<ICardProps> = ({children, height, width, isOpen, onCloseModal}) => {
  return (
    <Container
      height={height}
      width={width}
    >
      <Modal
        open={isOpen}
        onCancel={onCloseModal}
        onOk={onCloseModal}
      />
    </Container>
  );
}