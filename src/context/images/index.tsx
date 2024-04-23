import { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import {
  FileOptional,
  ImageContext,
  ImageContextProps,
  SignedUrlResponse,
} from "./image.context.d";
import { fileRequests } from "../../services/apis/requests/file";
import { isCollectionCompany } from "../../utils";

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
    optionals?: { brand?: string; name?: string },
  ): Promise<SignedUrlResponse> => {
    return fileRequests.getSignedUrl(fileName, fileType, templateId, {
      brand: optionals?.brand,
      name: optionals?.name,
    });
  };

  const uploadImages = useCallback(
    async (
      files: File[],
      bucketUrl: string,
      companyId: string,
      optionals?: { brand?: string; name?: string },
    ): Promise<string[] | void> => {
      try {
        const filesNames: string[] = [];
        const uploadPromises = files.map(async (file) => {
          const [fileName, fileType] = file.name.split(".");

          let signedUrl: any;

          if (!optionals?.brand || !optionals?.name) {
            // eslint-disable-next-line @typescript-eslint/no-throw-literal
            throw "Marca e Nome devem estar preenchidos";
          }

          signedUrl = await getSignedUrl(fileName, fileType, bucketUrl, {
            brand: optionals.brand,
            name: optionals.name,
          });

          filesNames.push(signedUrl.key);
          return fileRequests.uploadFile(file, signedUrl.url);
        });

        await Promise.all(uploadPromises);
        return filesNames;
      } catch (error) {
        if (typeof error === "string") {
          toast.warning(error);
        } else {
          throw new Error("Ocorreu um erro ao realizar o upload dos arquivos");
        }
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
