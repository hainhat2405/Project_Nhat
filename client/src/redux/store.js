import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/countSlide'
import userReducer from './slides/useSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})