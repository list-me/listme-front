import React from "react";
import {Container, Options} from "./styles";
import {ICellProps} from "./Cell.d";
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down-small.svg";
import {ReactComponent as EyeIcon} from "../../assets/eye-small.svg";

export const Cell: React.FC<ICellProps> = ({label, icon}) => {
    return (
        <Container>
            <label>
                {icon}
                {label}
            </label>
            <Options>
                <EyeIcon />
                <ChevronDownIcon />
            </Options>
        </Container>
    )
}
