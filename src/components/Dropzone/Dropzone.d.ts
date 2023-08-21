interface DropzoneRendererProps {
  value: Array<string>;
  templateId: string;
  productId: string;
  field: string;
  onSuccess: (images: Array<string>) => void;
  onCancel: () => void;
}

export type { DropzoneRendererProps };
