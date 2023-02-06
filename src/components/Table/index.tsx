import React from 'react';
import {Table, TablePaginationConfig} from "antd";
import {Container} from './styles';

export const CustomTable = (props: any) => {
    const w = window.innerWidth;
    const sizeType = props.size ?? "middle";
    const paginationConfig: TablePaginationConfig = {
        position: ["bottomRight"],
        responsive: true,
        style: {margin: "10px"},
        size: "small",
        pageSizeOptions: [15, 5],
    };

    return (
        <Container>
            <Table
                columns={props.columns}
                dataSource={props.dataProvider}
                rowKey={(record) => record.id}
                size={sizeType}
                style={{fontFamily: '"Satoshi Regular", sans-serif', color: "red"}}
                pagination={paginationConfig}
                bordered
                {...props}
            />
        </Container>
    );
}
