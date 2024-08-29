import { configureStore } from '@reduxjs/toolkit'
import  taskReducer  from './Actions/TaskSlice'
export const store = configureStore({
  reducer: {
    newTask:taskReducer
  },
})
export type RootState = ReturnType<typeof store.getState>