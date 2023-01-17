import React, {useState} from "react";
import {Container, Content, Shape, Icon, Label, Functions} from './styles';
// @ts-ignore
import { ReactComponent as Logo } from '../../assets/logo.svg';
import {ROUTES} from "../../constants/routes";
// @ts-ignore
import { ReactComponent as TemplateIcon} from '../../assets/templates.svg'
// @ts-ignore
import { ReactComponent as SettingsIcon} from '../../assets/settings.svg'
// @ts-ignore
import { ReactComponent as LogoutIcon} from '../../assets/log-out.svg'


export function Sidebar() {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const options = [
        {
            label: 'Templates',
            icon: <TemplateIcon />,
            to: ROUTES.TEMPLATES
        }
    ];

    const functions = [
        {
            label: "Configurações",
            icon: <SettingsIcon />,
            to: ROUTES.TEMPLATES
        },
        {
            label: "Sair",
            icon: <LogoutIcon />,
            to: ROUTES.TEMPLATES
        }
    ]

    return (
        <Container>
            <Logo />
            <Content>
                {
                    options.map((item) => (
                        <Shape>
                            <Icon> {item.icon} </Icon>
                            <Label> {item.label} </Label>
                        </Shape>
                    ))
                }
            </Content>
            <Functions>
                {
                    functions.map((item) => (
                        <Shape>
                            <Icon> {item.icon} </Icon>
                            <Label> {item.label} </Label>
                        </Shape>
                    ))
                }
            </Functions>
        </Container>
    );
}
