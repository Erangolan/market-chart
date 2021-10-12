/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'

import { Timestamps } from './features/charts/Timestamps'
import { Chart } from './features/charts/Chart'

function App() {

  return (
    <div className="container">
      <Timestamps />
      <Chart />
    </div>
  )
}

export default App