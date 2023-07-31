import React, { useContext, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { DropzoneRendererProps } from "./Dropzone";
import {
  CellContent,
  Container,
  Image,
  Loader,
  Zone,
  SuspenseMenu,
} from "./styles";
import { imageContext } from "../../context/images";
import { ReactComponent as AddIcon } from "../../assets/add-gray-large.svg";
import { ReactComponent as CloseIcon } from "../../assets/close-small-blue.svg";
import { ReactComponent as FileIcon } from "../../assets/file.svg";
import { productContext } from "../../context/products";
import { fileRequests } from "../../services/apis/requests/file";
import { DEFAULT_FILE_ICON_SRC } from "../../constants/default.styles";

const Dropzone: React.FC<DropzoneRendererProps> = ({
  value,
  instance,
  row,
  col,
  prop,
  className,
  templateId,
  dataProvider,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const [oldItems, setOldItems] = useState<string[]>(value);
  const [items, setItems] = useState<any[]>(value ?? [""]);
  const [top, setTop] = useState<any>("");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleSave } = useContext(productContext);

  const { uploadImages } = useContext(imageContext);

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      try {
        const newFiles = await uploadImages(acceptedFiles, templateId);
        if (newFiles) {
          const temp = [...newFiles, ...items].filter((item) => item !== "");

          const newData = dataProvider;
          newData[row][prop] = temp;

          setItems(temp);
          const id = await handleSave(newData[row]);
          if (id) newData[row].id = id;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) toast.error(error.message);
      }
    }
  };

  const handleRemove = async (
    imageUrl: string,
    event: React.MouseEvent,
  ): Promise<void> => {
    event.stopPropagation();

    setImageLoading(true);
    try {
      await fileRequests.dropFile(
        `${imageUrl}`,
        "template",
        window.location.pathname.substring(10),
        dataProvider[row]?.id,
      );

      const newValue = items.filter((item) => {
        if (item !== imageUrl) {
          return item;
        }
      });

      const newData = dataProvider;
      newData[row][prop] = newValue;

      if (newValue.length) {
        setItems(newValue);
      } else {
        setItems([]);
        newData[row][prop] = [];
      }

      setImageLoading(false);
    } catch (error) {
      setImageLoading(false);
      toast.error(
        "Não foi possível remover a imagem, por favor tente novamente",
      );
    }
  };

  const { getRootProps, open, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const onClose = (): void => {
    setIsOpen(false);
  };

  const handleAddIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setItems(value ?? [""]);
  }, []);

  useEffect(() => {
    if (modalRef.current!) {
      const topPosition = modalRef.current!.offsetParent as unknown as any;
      setTop(topPosition?.offsetTop);
    }

    function handleOutsideClick(event: any) {
      if (iconRef.current && iconRef.current!.contains(event.target)) {
        return;
      }

      if (modalRef.current && !modalRef.current!.contains(event.target)) {
        if (isOpen) {
          onClose();
        }
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  if (loading)
    return (
      <Loader className="lds-roller">
        <div className="loading-spinner" />
      </Loader>
    );

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files) {
            onDrop(Array.from(e.target.files));
          }
        }}
      />
      <Container
        {...getRootProps()}
        ref={modalRef}
        onClick={async () => setIsOpen(!isOpen)}
      >
        {isDragActive ? (
          <Zone>Arraste e solte aqui...</Zone>
        ) : (
          <CellContent>
            <div>
              <span onClick={(e) => e.preventDefault()}>
                {items?.length
                  ? items?.map((item, index) => {
                      if (item?.length > 1 && index < value?.length - 1) {
                        return `${item}, `;
                      }

                      return item;
                    })
                  : []}
              </span>
              <AddIcon onClick={handleAddIconClick} ref={iconRef} />
            </div>
          </CellContent>
        )}
        {isOpen && items?.length ? (
          <SuspenseMenu
            width={String(250)}
            top={String(top + 55)}
            ref={dropDownRef}
          >
            {items.map((item, index) => {
              if (item.length > 1) {
                const altName = item.split("/").pop();
                const srcValue = ["jpeg", "jpg", "svg", "png", "thumb"].some(
                  (extension) => item.includes(extension),
                )
                  ? item
                  : DEFAULT_FILE_ICON_SRC;

                return (
                  <Image key={index}>
                    {!imageLoading ? (
                      <CloseIcon onClick={(e) => handleRemove(item, e)} />
                    ) : (
                      <></>
                    )}
                    <a href={item} target="_blank" rel="noreferrer">
                      <img
                        src={srcValue}
                        alt={altName}
                        style={{ backgroundColor: "white" }}
                      />
                    </a>
                  </Image>
                );
              }
            })}
          </SuspenseMenu>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Dropzone;
