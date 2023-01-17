import React from 'react';
import {Container} from './styles';
import {Profile} from "../Profile";
import {Notification} from "../Notification";

export function Header() {
    return(
       <Container>
           <Notification />
           <Profile />
       </Container>
    );
}
