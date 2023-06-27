interface IModalProps {
  isOpen: boolean;
  changeVisible: () => void;
  children?: any;
  width?: string | number;
  top?: string;
}

export type { IModalProps };
