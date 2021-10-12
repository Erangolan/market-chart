import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import axios from 'axios'

const MAIN_URL='https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period='
const AFTER_PERCISION='&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume'

const chartAdapter = createEntityAdapter()

const initialState = chartAdapter.getInitialState({
  period: '',
  percision: '',
  status: 'idle',
  error: null
})

export const getDataByTimestamp = createAsyncThunk(
  '/charts/getDataByTimestamp', async ({ period, percision }) => {
    try {
      const {
        data
      } = await axios.get(`${MAIN_URL}${period}&Precision=${percision}${AFTER_PERCISION}`)

      const dataEntities = data.map((item, index) => ({
        id: index,
        ...item,
      }))

      console.log(data)

      return { dataEntities, period, percision }
    } catch(err) {
      console.log(err)
      return err
    }
  }
)

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getDataByTimestamp.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        const { dataEntities, period, percision } = payload
        state.period = period
        state.percision = percision
        chartAdapter.upsertMany(state, dataEntities)
      })
  },
})

export default chartSlice.reducer
export const { formUpdated } = chartSlice.actions

export const {
  selectAll: selectCharts,
} = chartAdapter.getSelectors((state) => state.chart)
