import {Input} from "antd";
import { Container, Label } from "./styles";

export const InputCustom = (props: any) => {
    return (
        <Container>
            <Label>
                {props?.label}
            </Label>
            <Input
                style={{height: "45px"}}
                type={props?.type}
            />
        </Container>
    )
}
