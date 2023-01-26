import React, {useContext} from "react";

const generateHookContext = <T,>(context: React.Context<T>, name = '') => (): T => {
    const contextValues = useContext<T>(context);

    if (!contextValues) {
        throw new Error(
            `${name ? `use ${name}` : ''} must be used within an ${name} Provider`
        );
    }

    return contextValues;
}

export default generateHookContext;
