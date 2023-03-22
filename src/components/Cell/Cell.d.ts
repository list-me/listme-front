import {ReactElement} from "react";

interface ICellProps {
    label: string;
    // icon: ReactElement;
    column: any;
    template: any;
    handleFrozen: Function;
    handleSort: Function;
    handleHidden: Function;
}

export type {ICellProps};
