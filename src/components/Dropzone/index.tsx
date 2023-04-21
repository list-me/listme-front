import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneRendererProps } from "./Dropzone";
import { Container, Label, Loader, Zone } from "./styles";
import { imageContext } from "../../context/images";
import { ReactComponent as AddIcon } from "../../assets/add-gray-large.svg";

const Dropzone: React.FC<DropzoneRendererProps> = ({
  value,
  instance,
  row,
  col,
  prop,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { uploadImages } = useContext(imageContext);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setLoading(true);
        try {
          const fileNames = await uploadImages(acceptedFiles);
          console.log({ fileNames });
          instance.setDataAtRowProp(row, prop, fileNames);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log({ error });
        }
      }
    },
    [instance, row, col],
  );

  const { getRootProps, open, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
    noClick: true,
    noKeyboard: true,
  });

  if (loading)
    return (
      <Loader className="lds-roller">
        <div className="loading-spinner"></div>
      </Loader>
    );

  useEffect(() => {
    console.log({ isDragActive });
  }, [isDragActive]);

  return (
    <Container {...getRootProps()}>
      {isDragActive ? (
        <Zone>Arraste e solte aqui...</Zone>
      ) : (
        <span>
          {value.map((item, index) => {
            if (item.length > 1 && index < value.length - 1) {
              return `${item}, `;
            }

            return item;
          })}
        </span>
      )}
      <AddIcon onClick={open} />
    </Container>
  );
};

export default Dropzone;
