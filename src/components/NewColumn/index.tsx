import { useEffect, useRef, useState } from "react";
import { AddColumn } from "./styles"
import {ReactComponent as AddColumnIcon} from "../../assets/add-column.svg";
import {ReactComponent as TextIcon} from "../../assets/text-icon.svg";
import {ReactComponent as RadioIcon} from "../../assets/radio-icon.svg";
import {ReactComponent as CheckBoxIcon} from "../../assets/checkbox-icon.svg";
import {ReactComponent as ListIcon} from "../../assets/list-icon.svg";

import { DropdownMenu } from "../DropdownMenu";
import { PersonalModal } from "../CustomModa";

interface NewColumnProps {
  template: any;
  setNewColumn: Function;
  newColumn: any;
  test: Function;
}

export const NewColumn: React.FC<NewColumnProps> = ({template, setNewColumn, newColumn, test}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [data, setData] = useState({});
  const [position, setPosition] = useState<number|null>(null);

  const iconRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);

  const options = [
    {
      label: "Campo de texto",
      icon: <TextIcon />,
      type: "text"
    },
    // {
    //   label: "Parágrafo",
    //   icon: <EyeIcon />,
    //   type: "paragraph"
    // },
    {
      label: "Escolha única",
      icon: <RadioIcon />,
      type: "radio" 
    },
    {
      label: "Caixa de seleção",
      icon: <CheckBoxIcon />,
      type: "checked"
    },
    {
      label: "Lista suspensa",
      icon: <ListIcon />,
      type: "list"
    },
  ]

  useEffect(() => {
    const pai = ref.current;
    if (pai) {
      const left = pai?.getBoundingClientRect().left + window.scrollX
      setPosition(left);
    }
  }, [isOpen, newColumn]);
  
  return (
    <>
      <PersonalModal
        isOpen={isOpenModal}
        onClickModal={() => setIsOpenModal(!isOpenModal)}
        data={data}
        template={template}
        onUpdate={(e, fields) => setNewColumn(e, fields)}
      />
      <AddColumn
        ref={ref} 
        className="testing"
        onClick={() => {
          test();
          setIsOpen(!isOpen)
        }}
      >
        <AddColumnIcon
          ref={iconRef}
          onClick={() => setIsOpen(!isOpen)}
        />
        <DropdownMenu
          changeOpen={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
          icoRef={iconRef}
          openModal={(e) => {
              test();
              setIsOpen(!isOpen)
              setIsOpenModal(!isOpenModal)
              setData({type: e?.type})
          }}
          options={options}
          left={position}
          setIsOpen={() => setIsOpen(false)}
        /> 
      </AddColumn>
    </>
  )
}