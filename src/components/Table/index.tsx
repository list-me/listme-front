import React from 'react';
import {Table, TablePaginationConfig} from "antd";
import {Container} from './styles';

export const CustomTable = (props: any) => {
    const w = window.innerWidth;
    const sizeType = props.size ?? "middle";
    const paginationConfig: TablePaginationConfig = {
        position: ["bottomRight"],
        size: "small",
        pageSize: 50
    };

    return (
        <Container>
            <Table
                columns={props.columns}
                dataSource={props.dataProvider}
                rowKey={(record) => record.id}
                size={sizeType}
                style={{
                    fontFamily: '"Satoshi Regular", sans-serif',
                    background: "#F3F4F6",
                }}
                pagination={paginationConfig}
                rowSelection={props.rowSelection}
            />
        </Container>
    );
}
