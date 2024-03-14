interface DropzoneRendererProps {
  value: Array<string>;
  templateId: string;
  productId: string;
  field: string;
  onSuccess: (images: Array<string>) => void;
  onCancel: () => void;
  instance: any;
  row: number;
  companyId: string;
  companyId: string;
  optionals: { brand: string; name: string };
  template: any;
}

export type { DropzoneRendererProps };
