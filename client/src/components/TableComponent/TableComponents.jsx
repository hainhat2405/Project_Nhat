import { Table } from 'antd';
import React from 'react'
// import Loading from '../LoadingComponents/Loading';
// import { isPending } from '@reduxjs/toolkit';

const TableComponents = (props) => {
    const { selectionType = "checkbox", data = [],  columns= [] } = props;
    // const [selectionType, setSelectionType] = useState('checkbox');setSelectionType, isLoading = false,

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        // <Loading isPending={isLoading}>
            <Table
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            {...props}
        />
        // </Loading>
    )
}

export default TableComponents