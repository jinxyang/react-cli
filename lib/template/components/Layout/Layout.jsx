import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Pages } from 'pages'

const Layout = () => {
  return (
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  )
}

export default Layout
