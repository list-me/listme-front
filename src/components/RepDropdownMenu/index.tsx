/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Divider, Input, Switch } from "antd";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IDropdownMenuProps } from "./RepDropdownMenu.d";
import { Container, Line, SwitchCustom } from "./styles";
import { ReactComponent as SearchIcon } from "../../assets/search-gray.svg";
import { productContext } from "../../context/products";

const DropdownMenu: React.FC<IDropdownMenuProps> = ({
  left,
  iconRef,
  handleOpen,
  isOpen,
  colHeaders,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [currentHidden, setCurrentHidden] = useState<any[]>([]);

  const { handleHidden, hidden, headerTable } = useContext(productContext);

  const customHidden = useCallback((item: any, state: boolean) => {
    setCurrentHidden((prev) => [...prev, Number(item?.order)]);
    return handleHidden(Number(item?.order), headerTable, state);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setCurrentHidden(hidden);

    setFilteredItems(
      headerTable
        ?.filter((item) =>
          item?.title?.toLowerCase().includes(inputValue.toLowerCase()),
        )
        .map((element) => {
          return {
            title: element?.title,
            order: element?.order,
          };
        }),
    );

    const handleScroll = () => {
      handleOpen();
    };

    function handleOutsideClick(event: any) {
      if (iconRef.current && iconRef.current!.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current!.contains(event.target)) {
        handleOpen();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    // window.addEventListener('wheel', handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      // window.removeEventListener('wheel', handleScroll);
    };
  }, [modalRef, isOpen, inputValue, headerTable]);

  return (
    <>
      {isOpen ? (
        <Container left={left} ref={modalRef}>
          <Input
            bordered={false}
            placeholder="Buscar campos"
            addonAfter={<SearchIcon />}
            onChange={handleInputChange}
          />
          <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
          <div className="content">
            {filteredItems.map((item) => {
              return (
                <Line>
                  <SwitchCustom
                    size="small"
                    onChange={(e) => customHidden(item, e)}
                    checked={hidden.includes(Number(item?.order))}
                  />
                  <label>{item?.title}</label>
                </Line>
              );
            })}
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default DropdownMenu;
