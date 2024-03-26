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
    bucket: string,
    companyId: string,
    optionals?: { brand?: string; name?: string },
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
