/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from './ChartSlice'
import { Button, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    padding: 2,
  },
}))

export const Timestamps = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [alignment, setAlignment] = useState('1-Minutes')

  const getDataByTime = (period, precision) => {
    dispatch(fetchData({ period, precision }))
    setAlignment(`${period}-${precision}`)
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      className={classes.root}>
      <Button
        onClick={() => getDataByTime('1', 'Minutes')}
        variant="outlined"
        disabled={alignment === '1-Minutes' ? 1 : 0}
      >
      1 Minutes
      </Button>
      <Button
        onClick={() => getDataByTime('5', 'Minutes')}
        variant="outlined"
        disabled={alignment === '5-Minutes' ? 1 : 0}
      >
      5 Minutes
      </Button>
      <Button
        onClick={() => getDataByTime('1', 'Hours')}
        variant="outlined"
        disabled={alignment === '1-Hours' ? 1 : 0}
      >
      1 Hour
      </Button>
      <Button
        onClick={() => getDataByTime('168', 'Hours')}
        variant="outlined"
        disabled={alignment === '168-Hours' ? 1 : 0}
      >
      1 Week
      </Button>
    </Stack>
  )
}
