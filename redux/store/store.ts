import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slice/userSlice'
import activityReducer from '../slice/activitySlice'
export const store = configureStore({
  reducer: {
    users: userReducer,
    activities: activityReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch