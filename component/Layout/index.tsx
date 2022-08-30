

import React from 'react'
import { LayoutProps } from '../../pages/models/Layout'
import Header from '../Header'



const LayoutClient = ({ children }: LayoutProps) => {
  return (
    <div className=''>
        <Header/>
      {/* WebsiteLayout */}
      {children}
    </div>
  )
}

export default LayoutClient