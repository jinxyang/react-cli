import React from 'react'

const routes = [
  {
    name: 'dashboard',
    path: '/',
    title: 'Dashboard',
    component: React.lazy(() => import('./Dashboard')),
  },
  {
    name: 'user',
    path: '/users',
    title: 'User',
    component: React.lazy(() => import('./User')),
  },
]

export default routes
