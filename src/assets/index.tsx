import React, {ReactComponentElement} from "react";
// @ts-ignore
import { ReactComponent as AddIcon} from "./add-secondary.svg";

export const ICONS = {
    BIKE_RED: <AddIcon/>
}

// @ts-ignore
export const getIcon = (icon: string): ReactComponentElement<any> => ICONS[icon];
