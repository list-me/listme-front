import React, { useContext, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneRendererProps } from "./Dropzone";
import { Container, Image, Label, Loader, Zone } from "./styles";
import { imageContext } from "../../context/images";
import { ReactComponent as AddIcon } from "../../assets/add-gray-large.svg";
import { ReactComponent as CloseIcon } from "../../assets/close-small-blue.svg";
import { ReactComponent as FileIcon } from "../../assets/file.svg";

import { SuspenseMenu } from "./styles";

const Dropzone: React.FC<DropzoneRendererProps> = ({
  value,
  instance,
  row,
  col,
  prop,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const [items, setItems] = useState<string[]>(value);
  const [top, setTop] = useState<any>("");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadImages } = useContext(imageContext);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      try {
        const newFiles = await uploadImages(acceptedFiles);
        console.log({ newFiles });
        if (newFiles) {
          const temp = [...newFiles, ...items].filter((item) => item != "");

          setItems(temp.filter((item) => item != ""));
          instance.setDataAtRowProp(row, prop, temp);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error({ error });
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

  const onClose = () => {
    instance.setDataAtRowProp(row, prop, items);
    setIsOpen(false);
  };

  const handleAddIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (modalRef.current!) {
      const topPosition = modalRef.current!.offsetParent as unknown as any;
      setTop(topPosition);
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
        <div className="loading-spinner"></div>
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
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          } else {
            instance.setDataAtRowProp(row, prop, items);
            setIsOpen(false);
          }
        }}
      >
        {isDragActive ? (
          <Zone>Arraste e solte aqui...</Zone>
        ) : (
          <>
            <span>
              {items.map((item, index) => {
                if (item.length > 1 && index < value.length - 1) {
                  return `${item}, `;
                }

                return item;
              })}
            </span>
            <AddIcon onClick={handleAddIconClick} ref={iconRef} />
          </>
        )}
        {isOpen && items.length ? (
          <SuspenseMenu
            width={String(instance.getColWidth(col) - 30)}
            top={String(top?.offsetTop + 55)}
            ref={dropDownRef}
          >
            {items.map((item, index) => {
              console.log({ item });
              if (item.length > 1) {
                return (
                  <Image key={index}>
                    <CloseIcon onClick={(e) => handleRemove(item, e)} />
                    <a href={item} target="_blank">
                      {item.includes("jpeg") ||
                      item.includes("jpg") ||
                      item.includes("svg") ||
                      item.includes("png") ? (
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
                      ) : (
                        // <span className="fileIcon">
                        <FileIcon className="fileIcon" />
                        // </span>
                      )}
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
