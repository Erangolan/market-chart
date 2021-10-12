import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import axios from 'axios'

const chartAdapter = createEntityAdapter()

const initialState = chartAdapter.getInitialState({
  period: '',
  precision: '',
  status: 'idle',
  error: null
})

export const fetchData = createAsyncThunk(
  '/charts/fetchData', async ({ period, precision }) => {
    try {
      const {
        data
      } = await axios.get(`https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=${period}&Precision=${precision}&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume`)

      const dataEntities = data.map((item, index) => ({
        id: index,
        ...item,
      }))

      return {
        dataEntities,
        period,
        precision,
      }
    } catch(err) {
      console.log(err)
      return err
    }
  }
)

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        const { dataEntities, period, precision } = payload
        state.period = period
        state.precision = precision
        chartAdapter.upsertMany(state, dataEntities)
      })
  },
})

export default chartSlice.reducer
export const { formUpdated } = chartSlice.actions

export const {
  selectAll: selectCharts,
} = chartAdapter.getSelectors((state) => state.chart)
