import React from 'react'
import { Pages as PagesWithRoutes } from '@jinxyang/react-lib'

import routes from './routes'

const Pages = () => {
  return <PagesWithRoutes loading={false} routes={routes} />
}

export default Pages
