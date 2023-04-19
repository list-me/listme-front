import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneRendererProps } from "./Dropzone";
import { Container, Label, Zone } from "./styles";

const Dropzone: React.FC<DropzoneRendererProps> = ({
  value,
  instance,
  row,
  col,
  prop,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log({ acceptedFiles: acceptedFiles[0].name });
      if (acceptedFiles.length > 0) {
        instance.setDataAtRowProp(row, prop, acceptedFiles[0].name);
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

  return (
    <Container {...getRootProps()}>
      {isDragActive ? (
        <Zone>Arraste e solte aqui...</Zone>
      ) : (
        <div>
          {!value.includes("") ? (
            value
          ) : (
            <Label>Arraste ou clique para selecionar</Label>
          )}
        </div>
      )}
    </Container>
  );
};

export default Dropzone;
