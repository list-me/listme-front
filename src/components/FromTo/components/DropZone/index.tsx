/* eslint-disable react/jsx-props-no-spreading */
import { useCallback } from "react";
import {
  useDropzone,
  DropzoneOptions,
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";
import { toast } from "react-toastify";
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
import { useFromToContext } from "../../../../context/FromToContext";

const MyDropzone = (): JSX.Element => {
  const { parseCSV, currentFile, setCurrentFile } = useFromToContext();

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: File[]) => {
      if (fileRejections.length > 0) {
        toast.error(
          "Arquivo Rejeitado: a extensão do arquivo não é permitida.",
        );
        return;
      }

      if (acceptedFiles.length === 0) {
        toast.error("Nenhum arquivo válido fornecido.");
        return;
      }

      const file = acceptedFiles[0];

      // @ts-ignore
      const ext = file.name.split(".").pop().toLowerCase();

      if (!["csv", "xls", "xlsx"].includes(ext)) {
        toast.error(
          "Arquivo Rejeitado: a extensão do arquivo não é permitida.",
        );
        return;
      }

      const reader = new FileReader();

      reader.onabort = () => console.log("Leitura de arquivo abortada.");
      reader.onerror = () => console.log("Erro na leitura do arquivo.");
      reader.onload = () => {
        console.log("Arquivo lido:", file.name);
      };
      setCurrentFile(file);
      parseCSV(file);
      reader.readAsArrayBuffer(file);
    },
    [parseCSV, setCurrentFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv, .xls, .xlsx",
    maxFiles: 1,
  } as unknown as DropzoneOptions);

  if (currentFile?.name) {
    return (
      <ContainerPreview>
        <IconContainer>
          <FileIcon />
        </IconContainer>
        <TitleFile>{currentFile?.name}</TitleFile>
        <CloseButton onClick={() => setCurrentFile(undefined)}>
          <CloseIcon />
        </CloseButton>
      </ContainerPreview>
    );
  }

  return (
    <ContainerDropZone
      {...(getRootProps() as DropzoneRootProps)}
      isDragActive={isDragActive}
    >
      <input {...(getInputProps() as DropzoneInputProps)} />
      <span>
        <Download />
      </span>
      <p>
        {isDragActive
          ? "Solte o arquivo aqui!"
          : "Clique para selecionar arquivo ou arraste até aqui"}
      </p>
      <span>Arquivos permitidos: csv, xls e xlsx</span>
    </ContainerDropZone>
  );
};

export default MyDropzone;
