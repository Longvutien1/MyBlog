

import React from 'react'
import { LayoutProps } from '../../models/Layout'
import Banner from '../Banner'
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