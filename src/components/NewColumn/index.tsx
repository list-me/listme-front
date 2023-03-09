import { useEffect, useRef, useState } from "react";
import { AddColumn } from "./styles"
import {ReactComponent as AddColumnIcon} from "../../assets/add-column.svg";
import {ReactComponent as EyeIcon} from "../../assets/eye-small.svg";
import { DropdownMenu } from "../DropdownMenu";
import { PersonalModal } from "../CustomModa";

export const NewColumn = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [data, setData] = useState({});
  const iconRef = useRef(null);

  const options = [
    {
      label: "Campo de texto",
      icon: <EyeIcon />,
      type: "text"
    },
    {
      label: "Parágrafo",
      icon: <EyeIcon />,
      type: "paragraph"
    },
    {
      label: "Escolha única",
      icon: <EyeIcon />,
      type: "radio" 
    },
    {
      label: "Caixa de seleção",
      icon: <EyeIcon />,
      type: "checked"
    },
    {
      label: "Lista suspensa",
      icon: <EyeIcon />,
      type: "list"
    },
  ]

  useEffect(() => {
  }, []);
  
  return (
    <>
      <PersonalModal isOpen={isOpenModal} onClickModal={() => setIsOpenModal(!isOpenModal)}
      data={data}
        template={{}} onUpdate={(e)=> console.log(e)}/>
      <AddColumn onClick={() => setIsOpen(!isOpen)} ref={iconRef}>
        <AddColumnIcon ref={iconRef}/>
        <DropdownMenu
                changeOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
                icoRef={iconRef}
                openModal={(e) => {
                    setIsOpen(!isOpen)
                    setIsOpenModal(!isOpenModal)
                    setData({type: e?.type})
                }}
                options={options}
        /> 
      </AddColumn>
      {/* {
        isOpen ?
          : <> </>
      } */}
    </>
  )
}