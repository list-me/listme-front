import { createContext, useCallback, useState } from "react";
import {
  ImageContext,
  ImageContextProps,
  SignedUrlResponse,
} from "./image.context.d";
import { fileRequests } from "../../services/apis/requests/file";
import { toast } from "react-toastify";

const imageContext = createContext<ImageContext>({
  uploadImages: async (): Promise<string[]> => [""],
  isDragActive: false,
  handleActiveDrag: () => {},
});

const ImageContextProvider: React.FC<ImageContextProps> = ({ children }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const uploadImages = useCallback(
    async (files: File[]): Promise<string[] | void> => {
      try {
        const filesNames: string[] = [];
        const uploadPromises = files.map(async (file) => {
          const signedUrl = await getSignedUrl(file.type);
          filesNames.push(
            `https://dev-listme.s3.amazonaws.com${signedUrl.access_url}`,
          );
          return fileRequests.uploadFile(file, signedUrl.url);
        });

        await Promise.all(uploadPromises);
        return filesNames;
      } catch (error) {
        toast.error("Ocorreu um erro");
      }
    },
    [],
  );

  const getSignedUrl = async (type: string): Promise<SignedUrlResponse> => {
    return fileRequests.getSignedUrl(type);
  };

  const handleActiveDrag = (): void => {
    console.log("OK");
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
