import { configureStore } from '@reduxjs/toolkit'
import flightReducer from './features/flightSearch/flightSlice'

const store = configureStore({
  reducer: {
    flights: flightReducer,
    // Add other reducers here as needed
  },
})

export default store
