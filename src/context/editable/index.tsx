import React from "react";
import type { FormInstance } from "antd/es/form";

interface EditableContextProps {
  form: FormInstance<any> | null;
}

export const editableContext = React.createContext<EditableContextProps>({
  form: null,
});
