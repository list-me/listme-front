import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneRendererProps } from "./Dropzone";
import { Container, Label, Loader, Zone } from "./styles";
import { imageContext } from "../../context/images";

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

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
    noClick: !value.includes(""),
  });

  if (loading)
    return (
      <Loader className="lds-roller">
        <div className="loading-spinner"></div>
      </Loader>
    );

  return (
    <Container {...getRootProps()}>
      {isDragActive ? (
        <Zone>Arraste e solte aqui...</Zone>
      ) : (
        <div>
          {!value.includes("") ? (
            value.map((item, index) => {
              if (item.length > 1 && index < value.length - 1) {
                return `${item}, `;
              }

              return item;
            })
          ) : (
            <Label>Arraste ou clique para selecionar</Label>
          )}
        </div>
      )}
    </Container>
  );
};

export default Dropzone;
