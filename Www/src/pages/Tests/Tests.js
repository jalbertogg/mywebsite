import './styles'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import LineChart from '../../components/viz/LineChart'

const Tests = () => {
  return (
    <div className="test bx--grid" >
      <h4>Unemployment rate in the USA up to 2014</h4>
      <div className="linechart-container">
        <LineChart
          id="linechart"
        />
      </div>
    </div>
  );
}

export default hot(Tests);
