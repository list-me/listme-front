interface ImageContextProps {
  children: any;
}

type FileOptional = {
  brand: string;
  name: string;
};

interface ImageContext {
  uploadImages: (
    files: File[],
    templateId: string,
    companyId: string,
    optionals?: FileOptional,
  ) => Promise<string[] | void>;
  isDragActive: boolean;
  handleActiveDrag: () => void;
}

interface SignedUrlResponse {
  url: string;
  access_url: string;
}

export type {
  ImageContextProps,
  ImageContext,
  SignedUrlResponse,
  FileOptional,
};
