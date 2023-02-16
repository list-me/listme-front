import React from "react";
import type { FormInstance } from "antd/es/form";

interface EditableContextProps {
    form: FormInstance<any> | null;
    editing: boolean;
    setEditing: Function;
}

export const editableContext = React.createContext<EditableContextProps>({
    form: null
});
