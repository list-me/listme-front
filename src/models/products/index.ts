import { RelationProductValue } from "./product";

export interface Product {
  id: string;
  title?: string;
  value: Array<string | RelationProductValue>;
}
