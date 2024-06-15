import { Dropdown, Space, Table } from 'antd';
import React, { useState } from 'react'
// import Loading from '../LoadingComponents/Loading';
// import { isPending } from '@reduxjs/toolkit';
import { DownOutlined } from '@ant-design/icons'
const TableComponents = (props) => {
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const { selectionType = "checkbox", data = [], columns = [], handleDeleteMany} = props;
    // const [selectionType, setSelectionType] = useState('checkbox');setSelectionType, isLoading = false,

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }
    return (
        // <Loading isPending={isLoading}>
        <>
        {rowSelectedKeys.length > 0 && (
        <div style={{width: '110px',background: 'rgb(22, 119, 255)', color: '#fff', fontWeight: 'bold' , padding: '10px', cursor: 'pointer', borderRadius: '10%'}} onClick={handleDeleteAll}>
           Xóa tất cả
        </div>
        )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </>
        // </Loading>

    )
}

export default TableComponents