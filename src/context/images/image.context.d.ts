interface ImageContextProps {
  children: any;
}

interface ImageContext {
  uploadImages: (files: File[]) => Promise<string[] | undefined>;
}

interface SignedUrlResponse {
  url: string;
  access_url: string;
}

export type { ImageContextProps, ImageContext, SignedUrlResponse };
