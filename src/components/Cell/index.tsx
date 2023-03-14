/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import {Container, Content, Options} from "./styles";
import {ICellProps} from "./Cell.d";
import {ReactComponent as ChevronDownIcon} from "../../assets/chevron-down-small.svg";
import {ReactComponent as AltText} from "../../assets/text-alt.svg";
import {ReactComponent as PencilIcon} from "../../assets/pencei-icon.svg";
import {ReactComponent as CopyIcon} from "../../assets/copy-icon.svg";
import { DropdownMenu } from "../DropdownMenu";
import { PersonalModal } from "../CustomModa";

export const Cell: React.FC<ICellProps> = ({label, column, template}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const iconRef = useRef(null);
    const [titleHeader, setTitleHeader] = useState<string>(label)
    const [posicaoPai, setPosicaoPai] = useState<number|null>(null);

    const options = [
        {
          label: "Editar Campo",
          icon: <PencilIcon />
        },
        {
          label: "Duplicar Campo",
          icon: <CopyIcon />
        }
    ]

    useEffect(() => {
        const pai = ref.current;
        if (pai) {
            const left = pai?.getBoundingClientRect().left + window.scrollX
            setPosicaoPai(left);
        }
    }, [isOpen]);

    return (
        <Content ref={ref}>
            <PersonalModal isOpen={isOpenModal} onClickModal={() => setIsOpenModal(!isOpenModal)} data={column} template={template}
            onUpdate={(e) => {
                setTitleHeader(e.title);
                window.location.reload()
            }}/>
            <Container>
                <label>
                    <AltText />
                    {titleHeader}
                </label>
                <Options>
                    <ChevronDownIcon ref={iconRef} onClick={() => setIsOpen(!isOpen)} />
                </Options>
            </Container>
            <DropdownMenu
                changeOpen={() => {
                    setIsOpen(!isOpen)
                }}
                isOpen={isOpen}
                icoRef={iconRef}
                openModal={() => {
                    setIsOpen(!isOpen)
                    setIsOpenModal(!isOpenModal)
                }}
                options={options}
                left={posicaoPai}
                setIsOpen={() => {setIsOpen(false)}}
            />
        </Content>
    )
}
