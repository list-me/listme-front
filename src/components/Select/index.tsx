import {Select} from "antd";

const CustomSelect = ({children}: any) => {
    const mock = [
        {
            label: "Delete",
            value: "delete"
        }
    ];

    return (
        <>
            <Select
                value="Ações em massa"
                options={mock}
            />
        </>
    );
}

export default CustomSelect;
