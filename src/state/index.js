import { configureStore } from '@reduxjs/toolkit'
import app from './app/reducer'

const useReduxDevTools = 'development'

const reducers = {
  app,
}
const store = configureStore({
  reducer: reducers,
  devTools: useReduxDevTools,
})

export default store