// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch } from 'react-redux'
import { getDataByTimestamp } from './ChartSlice'

export const Timestamps = () => {
  const dispatch = useDispatch()

  const getDataByTime = (period, percision) => {
    dispatch(getDataByTimestamp({ period, percision }))
  }

  return (
    <div className="row timestamp_container ">
      <button
        className=" timestamp_btn btn btn-primary"
        onClick={() => getDataByTime('1', 'Minutes')}
      >
      "1 Minutes"
      </button>
      <button
        className=" timestamp_btn btn btn-primary"
        onClick={() => getDataByTime('5', 'Minutes')}
      >
      "5 Minutes"
      </button>
      <button
        className=" timestamp_btn btn btn-primary"
        onClick={() => getDataByTime('1', 'Hours')}
      >
      "1 Hour"
      </button>
      <button
        className=" timestamp_btn btn btn-primary"
        onClick={() => getDataByTime('168', 'Hours')}
      >
      "1 Week"
      </button>
    </div>
  )
}
