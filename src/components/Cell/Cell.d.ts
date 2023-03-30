import {ReactElement} from "react";

interface ICellProps {
    label: string;
    // icon: ReactElement;
    column: any;
    template: any;
    handleFrozen: Function;
    handleSort: Function;
    handleHidden: Function;
    freeze: boolean;
    test: Function;
    test1: Function;
}

export type {ICellProps};
