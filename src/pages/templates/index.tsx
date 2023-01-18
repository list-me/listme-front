import React from "react";
import {Sidebar} from "../../components/Sidebar";
import {Header} from "../../components/Header";
import {TitlePage, Container} from "./styles";
import {Button} from "../../components/Button";
// @ts-ignore
import { ReactComponent as AddIcon} from '../../assets/add-secondary.svg';

export const Template = () => {

    return (
        <>
            <Sidebar />
            <Header />
            <Container>
                <TitlePage> Catálogos </TitlePage>
                <Button
                    isLoading={false}
                    width='200px'
                    height='50px'
                    isSecondary
                >
                    <AddIcon />
                    Novo template
                </Button>
            </Container>
        </>
    );
}
