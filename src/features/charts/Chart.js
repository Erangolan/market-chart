/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { useSelector } from 'react-redux'
import { selectCharts } from './ChartSlice'

export const Chart = () => {
  const [tickIntervalVar, setTickIntervalVar] = useState(4)
  const period = useSelector((state) => state.chart.period)
  const percision = useSelector((state) => state.chart.percision)
  const stockData = useSelector(selectCharts)

  useEffect(() => {
    if (period === '1' && percision === 'Minutes') {
      setTickIntervalVar(4)
    }
    if (period === '5' && percision === 'Minutes') {
      setTickIntervalVar(6)
    }
    if (period === '1' && percision === 'Hours') {
      setTickIntervalVar(12)
    }
    if (period === '168' && percision === 'Hours') {
      setTickIntervalVar(24)
    }
  }, [period, percision])

  const options = {
    title: { text: 'Apple Inc. Stocks' },
    xAxis: {
      tickInterval: tickIntervalVar * 3600 * 1000,
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Stock Price',
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: 'Close Price',
        data: stockData.map((dat) => [new Date(dat.Date).getTime(), dat.Close]),
      },
    ],
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
