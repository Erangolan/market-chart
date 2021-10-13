/* eslint-disable no-unused-vars */
import React from 'react'

import { Timestamps } from './features/charts/Timestamps'
import { Chart } from './features/charts/Chart'

function App() {

  return (
    <div className="container">
      <Chart />
      <Timestamps />
    </div>
  )
}

export default App