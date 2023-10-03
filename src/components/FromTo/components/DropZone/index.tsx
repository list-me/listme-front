/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from "react";
import {
  useDropzone,
  DropzoneOptions,
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";
import {
  CloseButton,
  ContainerDropZone,
  ContainerPreview,
  IconContainer,
  TitleFile,
} from "./styles";
import { ReactComponent as Download } from "../../../../assets/download.svg";
import { ReactComponent as FileIcon } from "../../../../assets/csv-file.svg";
import { ReactComponent as CloseIcon } from "../../../../assets/close-gray.svg";

const MyDropzone = ({
  fileName,
  setFileName,
}: {
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("Leitura de arquivo abortada.");
      reader.onerror = () => console.log("Erro na leitura do arquivo.");
      reader.onload = () => {
        console.log("Arquivo lido:", file.name);
      };

      setFileName(file.name);
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv, .xls, .xlsx",
  } as unknown as DropzoneOptions);

  if (fileName) {
    return (
      <ContainerPreview>
        <IconContainer>
          <FileIcon />
        </IconContainer>
        <TitleFile>{fileName}</TitleFile>
        <CloseButton>
          <CloseIcon />
        </CloseButton>
      </ContainerPreview>
    );
  }

  return (
    <ContainerDropZone {...(getRootProps() as DropzoneRootProps)}>
      <input {...(getInputProps() as DropzoneInputProps)} />
      <span>
        <Download />
      </span>
      <p>Clique para selecionar arquivo ou arraste até aqui</p>
      <span>Arquivos permitidos: csv, xls e xlsx</span>
    </ContainerDropZone>
  );
};

export default MyDropzone;
