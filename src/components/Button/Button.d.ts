export interface IButtonProps {
    children: any;
    isLoading: boolean;
    width?: string;
    height?: string;
    isSecondary?: boolean;
    onClickModal?: () => void;
}

export interface IButtonPropsStyles {
    isLoading: boolean;
    width?: string;
    height?: string;
    isSecondary?: boolean;
}
