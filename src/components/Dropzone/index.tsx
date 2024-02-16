/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { DropzoneRendererProps } from "./Dropzone";
import { Container, Image, NewContainer, Content, ModalHeader } from "./styles";
import { ImageContextProvider, imageContext } from "../../context/images";
import { ReactComponent as CloseModalIcon } from "../../assets/close-gray.svg";
import { ReactComponent as CloseIcon } from "../../assets/close-xsmall-blue.svg";
import { ReactComponent as AddIcon } from "../../assets/add-gray-large.svg";

import { fileRequests } from "../../services/apis/requests/file";

import Modal from "../Modal";
import { Loading } from "../Loading";
import { getFilenameFromUrl } from "../../utils";
import { productRequests } from "../../services/apis/requests/product";

const Dropzone: React.FC<DropzoneRendererProps> = ({
  value,
  templateId,
  productId,
  field,
  onCancel,
  onSuccess,
  companyId,
  optionals,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>(value ?? []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadImages } = useContext(imageContext);

  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    if (acceptedFiles.length > 0) {
      setLoading(true);
      try {
        const newFiles = await uploadImages(
          acceptedFiles,
          templateId,
          companyId,
          optionals,
        );

        if (newFiles) {
          setItems((prev) => [...prev, ...newFiles]);
          onSuccess([...newFiles, ...items]);
        }

        setLoading(false);
      } catch (error) {
        onCancel();
        setLoading(false);
        if (error instanceof Error) toast.error(error.message);
      }
    }
  };

  const handleRemove = async (
    imageUrl: string,
    event: React.MouseEvent,
    items: any[],
  ): Promise<void> => {
    event.stopPropagation();

    setImageLoading(true);
    try {
      await fileRequests.dropFile(
        `${imageUrl}`,
        "template",
        window.location.pathname.substring(10),
        productId,
        field,
      );
      const newValue = items.filter((item) => {
        if (item !== imageUrl) {
          return item;
        }
      });
      if (newValue.length) {
        setItems(newValue);
      } else {
        setItems([]);
      }
      onSuccess(newValue);
      setImageLoading(false);

      const moreLinks = items.filter((fItem) => {
        return fItem !== imageUrl;
      });
      const newValueToPatch = {
        value: [
          {
            value: imageUrl,
            destroy: true,
          },
          ...moreLinks,
        ],
      };

      await productRequests.patchProductValue({
        value: newValueToPatch.value as any,
        productId,
        fieldId: field,
      });
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

  const onBeforeKeyDown = async (event: any): Promise<void> => {
    if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onBeforeKeyDown);

    return () => {
      window.removeEventListener("keydown", onBeforeKeyDown);
    };
  }, []);

  return (
    <ImageContextProvider>
      <Modal
        isOpen={isOpen}
        changeVisible={() => {
          if (loading) return;
          setIsOpen(!isOpen);
          onCancel();
        }}
        width={1000}
        top="8%"
      >
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
        <ModalHeader
          onClick={() => {
            if (loading) return;
            setIsOpen(false);
            onCancel();
          }}
        >
          Arquivos
          <CloseModalIcon
            onClick={() => {
              if (loading) return;
              onClose();
            }}
          />
        </ModalHeader>
        <Container>
          {!loading ? (
            <>
              {items.length ? (
                items?.map((item: string, index: number) => {
                  const fileNameWithExtension = getFilenameFromUrl(item);
                  if (fileNameWithExtension) {
                    const lastDotIndex = fileNameWithExtension.lastIndexOf(".");
                    const fileType = fileNameWithExtension.substring(
                      lastDotIndex + 1,
                    );
                    const icon =
                      "https://prod-listme.s3.amazonaws.com/file.svg";
                    return (
                      <Content>
                        <Image key={index}>
                          {!["jpg", "jpeg", "png", "thumb", "webp"].includes(
                            fileType,
                          ) ? (
                            <>
                              <a
                                href={item}
                                target="_blank"
                                rel="noreferrer"
                                download
                              >
                                <img
                                  src={icon}
                                  alt="altName"
                                  style={{ backgroundColor: "white" }}
                                  // onError={(e) => {
                                  //   (e.target as HTMLImageElement).src =
                                  //     "https://d1ptd3zs6hice0.cloudfront.net/users-data-homolog/IMG_IJ06ikQw9qqGOhPdTBpz.png";
                                  // }}
                                />
                              </a>
                              <label
                                htmlFor="null"
                                title={getFilenameFromUrl(item) ?? ""}
                              >
                                {getFilenameFromUrl(item)}
                              </label>
                            </>
                          ) : (
                            <>
                              <a href={item} target="_blank" rel="noreferrer">
                                <img
                                  src={item}
                                  alt={getFilenameFromUrl(item) ?? ""}
                                  style={{ backgroundColor: "white" }}
                                  // onError={(e) => {
                                  //   (e.target as HTMLImageElement).src =
                                  //     "https://d1ptd3zs6hice0.cloudfront.net/users-data-homolog/IMG_IJ06ikQw9qqGOhPdTBpz.png";
                                  // }}
                                />
                              </a>
                              <label
                                htmlFor="null"
                                title={getFilenameFromUrl(item) ?? ""}
                              >
                                {getFilenameFromUrl(item)}
                              </label>
                            </>
                          )}
                        </Image>
                        {!imageLoading ? (
                          <CloseIcon
                            onClick={(e) => handleRemove(item, e, items)}
                          />
                        ) : (
                          <></>
                        )}
                      </Content>
                    );
                  }
                })
              ) : (
                <></>
              )}
              <NewContainer onClick={handleAddIconClick}>
                <AddIcon />
              </NewContainer>
            </>
          ) : (
            <Loading />
          )}
        </Container>
      </Modal>
    </ImageContextProvider>
  );
};

export default Dropzone;
