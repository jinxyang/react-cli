import React from 'react'
import ReactDOM from 'react-dom'

import { GlobalProvider } from 'contexts'
import { App } from 'components'

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
