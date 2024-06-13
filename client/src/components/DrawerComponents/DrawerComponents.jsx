import { Drawer } from 'antd'
import React from 'react'

const DrawerComponents = ({title = 'Drawer',children, placement = 'right', isOpen = false, ...rests }) => {
    return (
        <div>
            <>
                <Drawer title={title} placemen = {placement} open={isOpen} {...rests}>
                    {children}
                </Drawer>
            </>
        </div>
    )
}

export default DrawerComponents