interface ICardProps {
  height: string;
  width: string;
  children?: React.FC<any>;
  isOpen: boolean;
  onCloseModal: () => void;
}

interface ICardStyleProps {
  height: string;
  width: string;
}

export type { ICardProps, ICardStyleProps };
