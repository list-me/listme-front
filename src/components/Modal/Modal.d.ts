interface IModalProps {
  isOpen: boolean;
  changeVisible: () => void;
  children?: any;
  width?: string | number;
}

export type { IModalProps };
