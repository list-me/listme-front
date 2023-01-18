import React from 'react';
import {Container} from './styles';
import {Profile} from "../Profile";
import {Notification} from "../Notification";
import {Button} from "../Button";
// @ts-ignore
import { ReactComponent as AddIcon} from '../../assets/add.svg'

export function Header() {
    return(
       <Container>
           <Button
               isLoading={false}
               width='200px'
               height='50px'
           >
               <AddIcon />
               Criar catálogo
           </Button>
           <Notification />
           <Profile />
       </Container>
    );
}
