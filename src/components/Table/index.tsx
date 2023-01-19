import React from 'react';
import {Table, TablePaginationConfig} from "antd";
import {Container} from './styles';

export const CustomTable = (props: any) => {
    const sizeType = props.size ?? "middle";
    const paginationConfig: TablePaginationConfig = {
        position: ["bottomRight"],
        responsive: true,
        style: {margin: "10px"},
        defaultPageSize: 5
    };

    return (
        <Container>
            <Table
                columns={props.columns}
                dataSource={props.dataProvider}
                size={sizeType}
                style={{fontFamily: '"Satoshi Regular", sans-serif', color: "red"}}
                pagination={paginationConfig}
                bordered
                {...props}
            />
        </Container>
    );
}
