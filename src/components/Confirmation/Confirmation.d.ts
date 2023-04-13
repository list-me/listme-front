interface OPERATIONS {
  DELETE: 'excluir';
}

interface IPropsConfirmation {
  description: string;
  title: string;
  pass: string;
  action: string;
  isOpen: boolean;
  handleChangeVisible: () => void;
  handleConfirmation: () => void;
}

export type {IPropsConfirmation};
