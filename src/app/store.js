import { configureStore } from '@reduxjs/toolkit'
import chartReducer from '../features/charts/ChartSlice'

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
})
