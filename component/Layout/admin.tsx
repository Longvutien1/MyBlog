import React from 'react'
import { LayoutProps } from '../../pages/models/Layout'
import Header from '../Header'

const AdminLayout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header/>
      
            {children}
        </div>
    )
}

export default AdminLayout