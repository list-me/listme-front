export type IPayload = {
  id: string;
  key: string;
  cast: string;
  types: string[];
  required: boolean;
};
export type IFieldsByID = {
  id: string;
  name: string;
  payload: IPayload[];
  endpointPath: string;
  isDone: boolean;
};

export interface ITemplatesById {
  id: string;
  name: string;
  payloads: {
    fields: IFieldsByID[];
    provider: string;
    description: string;
    thumbnailUrl: string;
  };
}
