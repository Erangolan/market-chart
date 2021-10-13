/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { useSelector } from 'react-redux'
import { selectCharts } from './ChartSlice'

export const Chart = () => {
  const [tickIntervalVar, setTickIntervalVar] = useState(4)
  const period = useSelector((state) => state.chart.period)
  const precision = useSelector((state) => state.chart.precision)
  const chartData = useSelector(selectCharts)

  useEffect(() => {
    switch(precision) {
    case ('Hours'):
      setTickIntervalVar(period === '1' ? 12 : 168)
      break
    default:
      setTickIntervalVar(period === '1' ? 4 : 6)
      break
    }
  }, [period, precision])

  const options = {
    title: { text: 'Apple stock data' },
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
    series: [{
      data: chartData.map((item) => [new Date(item.Date).getTime(), item.Close]),
    }],
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}
