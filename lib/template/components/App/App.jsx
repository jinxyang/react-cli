import React from 'react'

import { Provider } from '@jinxyang/react-lib'

import { useGlobal } from 'contexts'

import Layout from '../Layout'
import Login from '../Login'

const App = () => {
  const [global] = useGlobal()
  const fetchOptions = React.useMemo(() => {
    return {
      // also for every fetch
      // https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
      transformRequest: null, // (input, init) => [input, init]
      transformResponse: null, // async (response) => ({ code, data, message })
    }
  }, [])

  return React.useMemo(
    () => (
      <Provider fetchOptions={fetchOptions}>
        {global.status === 1 ? <Layout /> : <Login />}
      </Provider>
    ),
    [fetchOptions, global.status],
  )
}

export default App
