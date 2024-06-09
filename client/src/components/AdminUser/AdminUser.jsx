import React from 'react'
import { PlusCircleOutlined} from '@ant-design/icons';
import TableComponents from '../TableComponent/TableComponents';

const AdminUser = () => {
  return (
    <div className='user_info'>
        <h1>Quản lý người dùng</h1>
        <button><PlusCircleOutlined/></button>
        <div style={{marginTop: "20px"}}>
        <TableComponents/>
        </div>
    </div>
  )
}

export default AdminUser