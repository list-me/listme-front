import React, {useState} from 'react';
import {Container, RightContent} from './styles';
import {Profile} from "../Profile";
import {Notification} from "../Notification";
import {Button} from "../Button";
// @ts-ignore
import { ReactComponent as AddIcon} from '../../assets/add.svg'
import {CustomModal} from "../Modal";
import {templateRequests} from "../../services/apis/requests/template";

export function Header() {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return(
        <>
            <CustomModal
                isOpen={modalIsOpen}
                onClickModal={() => setModalIsOpen(!modalIsOpen)}
            />
            <Container>
                <RightContent>
                    <Button
                        isLoading={false}
                        width='152px'
                        height='45px'
                        onClickModal={() => setModalIsOpen(!modalIsOpen)}
                    >
                        <AddIcon />
                        Criar template
                    </Button>
                    <Notification />
                    <Profile />
                </RightContent>
            </Container>
        </>
    );
}
