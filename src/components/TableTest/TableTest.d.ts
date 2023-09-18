/* eslint-disable import/prefer-default-export */
type IColumnsCustom = {
  isCustom: boolean;
  title: string;
  data: string;
  className: string;
  type: string;
  required: boolean;
  options: string[];
  order: string;
  hidden: boolean;
  width: string;
  frozen: boolean;
  bucket_url: string;
}[];

export { IColumnsCustom };
