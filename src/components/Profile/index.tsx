import {Container, Icon, Label} from './styles';
// @ts-ignore
import { ReactComponent as DropdownIcon} from '../../assets/drop-down.svg';

export function Profile() {
    return(
        <Container>
            <Icon>
                <img src='https://picsum.photos/id/237/200/300' alt='okokadsdasdasdasdasdok'/>
            </Icon>
            <Label> John Doe </Label>
            <DropdownIcon />
        </Container>
    );
}
