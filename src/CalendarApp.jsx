import React from 'react'
import { Provider } from 'react-redux'


import { store } from './Store/store'
import { AppRouter } from './Router/AppRouter'




export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
