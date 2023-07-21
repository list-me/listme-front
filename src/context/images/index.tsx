import { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import {
  ImageContext,
  ImageContextProps,
  SignedUrlResponse,
} from "./image.context.d";
import { fileRequests } from "../../services/apis/requests/file";

const imageContext = createContext<ImageContext>({
  uploadImages: async (): Promise<string[]> => [""],
  isDragActive: false,
  handleActiveDrag: () => {},
});

const ImageContextProvider: React.FC<ImageContextProps> = ({ children }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const getSignedUrl = async (
    fileName: string,
    fileType: string,
    templateId: string,
  ): Promise<SignedUrlResponse> => {
    return fileRequests.getSignedUrl(fileName, fileType, templateId);
  };

  const uploadImages = useCallback(
    async (files: File[], url: string): Promise<string[] | void> => {
      try {
        const filesNames: string[] = [];
        const uploadPromises = files.map(async (file) => {
          const [fileName, fileType] = file.name.split(".");

          const signedUrl = await getSignedUrl(fileName, fileType, url);
          filesNames.push(signedUrl.access_url);
          return fileRequests.uploadFile(file, signedUrl.url);
        });

        await Promise.all(uploadPromises);
        return filesNames;
      } catch (error) {
        throw new Error("Ocorreu um erro ao realizar o upload dos arquivos");
      }
    },
    [],
  );

  const handleActiveDrag = (): void => {
    setIsDragActive(true);
  };

  const value: ImageContext = {
    uploadImages,
    isDragActive,
    handleActiveDrag,
  };

  return (
    <imageContext.Provider value={value}>{children}</imageContext.Provider>
  );
};

export { ImageContextProvider, imageContext };
