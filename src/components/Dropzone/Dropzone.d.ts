interface DropzoneRendererProps {
  value: Array<string>;
  templateId: string;
  productId: string;
  field: string;
  onSuccess: (images: Array<string>) => void;
  onCancel: () => void;
  companyId: string;
  optionals: { brand: string; name: string };
}

export type { DropzoneRendererProps };
