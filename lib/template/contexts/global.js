import React from 'react'

import { deleteProp } from '@jinxyang/react-lib'

const initialState = {
  mode: 'light',
  status: 1, // 0: logout, 1: login
  user: {},
  menus: [],
  menusTree: [],
  menusMap: {},
  permissions: [],
  permissionsMap: {},
}

const reducer = (state, { type, ...payload }) => {
  const handles = {
    mode: ({ mode = 'light' }) => {
      return { ...state, mode }
    },
    status: ({ status = 0, ...otherState }) => {
      return { ...state, ...otherState, status }
    },
  }

  if (handles[type]) {
    const nextState = handles[type](payload)
    console.group('GlobalContext')
    console.log('PrevState: ', state)
    console.log(`Type: ${type}`)
    console.log('Payload: ')
    console.log(payload)
    console.log('NextState: ')
    console.log(nextState)
    console.groupEnd('GlobalContext')
    return nextState
  }

  return state
}

const GlobalContext = React.createContext([])

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, { ...initialState })

  const actions = React.useMemo(() => {
    return {
      updateMode: (mode = 'light') => {
        dispatch({
          type: 'mode',
          mode,
        })
      },
      login: () => {
        dispatch({
          type: 'status',
          status: 1,
        })
      },
      logout: () => {
        dispatch({ ...deleteProp(initialState, 'mode') })
      },
    }
  }, [])

  return (
    <GlobalContext.Provider value={[state, actions]}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => React.useContext(GlobalContext)
