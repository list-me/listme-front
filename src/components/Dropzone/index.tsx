import React, { useContext, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { DropzoneRendererProps } from "./Dropzone";
import {
  CellContent,
  Container,
  Image,
  Label,
  Loader,
  Zone,
  SuspenseMenu,
} from "./styles";
import { imageContext } from "../../context/images";
import { ReactComponent as AddIcon } from "../../assets/add-gray-large.svg";
import { ReactComponent as CloseIcon } from "../../assets/close-small-blue.svg";
import { ReactComponent as FileIcon } from "../../assets/file.svg";
import { productContext } from "../../context/products";

const Dropzone: React.FC<DropzoneRendererProps> = ({
  value,
  instance,
  row,
  col,
  prop,
  className,
  bucket_url,
  dataProvider,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

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
        const newFiles = await uploadImages(acceptedFiles, bucket_url);

        console.log("new added", { newFiles, items, value });
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

  const handleRemove = (imageUrl: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const newValue = items.filter((item) => {
      if (item != imageUrl) {
        return item;
      }
    });

    if (newValue.length) {
      setItems(newValue);
    } else {
      setItems([]);
    }
  };

  const handleImageLoadEnd = (src: string) => {
    setImageLoading((prev) => ({ ...prev, [src]: false }));
  };

  const { getRootProps, open, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const onClose = async () => {
    setIsOpen(false);
    if (oldItems?.length > items?.length) {
      const newData = dataProvider;
      newData[row][prop] = items;

      const id = await handleSave(newData[row]);
      // if (id) newData[row].id = id;
    }
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
  }, [isOpen, items]);

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
        onClick={async () => {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            // instance.setDataAtRowProp(row, prop, items);
            setIsOpen(false);
            if (oldItems?.length > items?.length) {
              const newData = dataProvider;
              newData[row][prop] = items;

              // console.log({ newData: newData[row][prop] });
              const id = await handleSave(newData[row]);
              if (id) newData[row].id = id;
            }
          }
        }}
        // className={className}
      >
        {isDragActive ? (
          <Zone>Arraste e solte aqui...</Zone>
        ) : (
          <CellContent>
            <div>
              <span>
                {items?.map((item, index) => {
                  if (item?.length > 1 && index < value?.length - 1) {
                    return `${item}, `;
                  }

                  return item;
                })}
              </span>
              <AddIcon onClick={handleAddIconClick} ref={iconRef} />
            </div>
            {/* <label htmlFor="" className={className} /> */}
          </CellContent>
        )}
        {isOpen && items?.length ? (
          <SuspenseMenu
            width={String(250)}
            top={String(top + 55)}
            ref={dropDownRef}
          >
            {items?.map((item, index) => {
              if (item.length > 1) {
                return (
                  <Image key={index}>
                    <CloseIcon onClick={(e) => handleRemove(item, e)} />
                    <a href={item} target="_blank" rel="noreferrer">
                      {/* {item.includes("jpeg") ||
                      item.includes("jpg") ||
                      item.includes("svg") ||
                      item.includes("png") ? ( */}
                      <img
                        src={item}
                        onLoad={() => handleImageLoadEnd(item)}
                        onError={() => handleImageLoadEnd(item)}
                        style={{
                          opacity: imageLoading[item] ? 0.5 : 1,
                          transition: "opacity 0.3s",
                          backgroundColor: "#f7f7f7",
                        }}
                      />
                      {/* ) : (
                        // <span className="fileIcon">
                        <FileIcon className="fileIcon" />
                        // </span>
                      )} */}
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
