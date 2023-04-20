import { createContext, useCallback } from "react";
import {
  ImageContext,
  ImageContextProps,
  SignedUrlResponse,
} from "./image.context.d";
import { fileRequests } from "../../services/apis/requests/file";
import { toast } from "react-toastify";

const imageContext = createContext<ImageContext>({
  uploadImages: async (): Promise<string[]> => [""],
});

const ImageContextProvider: React.FC<ImageContextProps> = ({ children }) => {
  const uploadImages = useCallback(
    async (files: File[]): Promise<string[] | undefined> => {
      try {
        const filesNames: string[] = [];
        const uploadPromises = files.map(async (file) => {
          const signedUrl = await getSignedUrl();
          filesNames.push(signedUrl.access_url);
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

  const getSignedUrl = async (): Promise<SignedUrlResponse> => {
    return fileRequests.getSignedUrl();
  };

  const value: ImageContext = {
    uploadImages,
  };

  return (
    <imageContext.Provider value={value}>{children}</imageContext.Provider>
  );
};

export { ImageContextProvider, imageContext };
