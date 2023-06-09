interface ImageContextProps {
  children: any;
}

interface ImageContext {
  uploadImages: (files: File[], bucket_url: string) => Promise<string[] | void>;
  isDragActive: boolean;
  handleActiveDrag: () => void;
}

interface SignedUrlResponse {
  url: string;
  access_url: string;
}

export type { ImageContextProps, ImageContext, SignedUrlResponse };
