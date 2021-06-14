import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './pages/postform/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})