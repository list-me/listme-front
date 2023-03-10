import { useEffect, useRef, useState } from "react";
import { AddColumn } from "./styles"
import {ReactComponent as AddColumnIcon} from "../../assets/add-column.svg";
import {ReactComponent as EyeIcon} from "../../assets/eye-small.svg";
import { DropdownMenu } from "../DropdownMenu";
import { PersonalModal } from "../CustomModa";

interface NewColumnProps {
  template: any;
}

export const NewColumn: React.FC<NewColumnProps> = ({template}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [data, setData] = useState({});
  const [position, setPosition] = useState<number|null>(null);

  const iconRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  const options = [
    {
      label: "Campo de texto",
      icon: <EyeIcon />,
      type: "text"
    },
    // {
    //   label: "Parágrafo",
    //   icon: <EyeIcon />,
    //   type: "paragraph"
    // },
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
    const pai = ref.current;
    if (pai) {
        const left = pai.getBoundingClientRect().left + window.scrollX
        setPosition(left);
    }
  }, [isOpen]);
  
  return (
    <>
      <PersonalModal
        isOpen={isOpenModal}
        onClickModal={() => setIsOpenModal(!isOpenModal)}
        data={data}
        template={template}
        onUpdate={(e)=> window.location.reload()}
      />
      <AddColumn ref={ref}>
        <AddColumnIcon
          ref={iconRef}
            onClick={() => setIsOpen(!isOpen)}
        />
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
          left={position}
        /> 
      </AddColumn>
    </>
  )
}