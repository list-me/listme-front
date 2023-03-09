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
    const iconRef = useRef(null);
    const [titleHeader, setTitleHeader] = useState<string>(label)

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
    }, [])
    return (
        <Content>
            <PersonalModal isOpen={isOpenModal} onClickModal={() => setIsOpenModal(!isOpenModal)} data={column} template={template} onUpdate={(e)=> setTitleHeader(e.title)}/>
            <Container>
                <label>
                    <AltText />
                    {titleHeader}
                </label>
                <Options>
                    <ChevronDownIcon ref={iconRef} onClick={() => setIsOpen(!isOpen)} />
                </Options>
                <DropdownMenu
                    changeOpen={() => setIsOpen(!isOpen)}
                    isOpen={isOpen}
                    icoRef={iconRef}
                    openModal={() => {
                        setIsOpen(!isOpen)
                        setIsOpenModal(!isOpenModal)
                    }}
                    options={options}
                />
            </Container>
        </Content>
    )
}
