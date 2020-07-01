import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
import WorldGlobe3D from '../viz/WorldGlobe3D'
import LineChartDemo from '../viz/LineChartDemo'
import './styles'

const HeaderTitleImage = (props) => {
  return (
    <div className='header-title-image'>
      <div className="banner-container">
        <div className='banner'>
          <div className='bx--grid'>
            <div className='bx--row world_container'>
              <div className='bx--col-sm-4 bx--col-md-3 bx--col-lg-7 bx--col-xlg-6 header-text'>
                <h1 className='title'>{props.title}</h1>
                <p className='subtitle'>{props.subtitle}</p>
              </div>
              <div className='bx--col-sm-4 bx--col-md-4 bx--col-lg-5 bx--col-xlg-7 world_globe'>
                <WorldGlobe3D
                  id="world-globe-3d"
                  width={355}
                  quality='LowFi'
                  isMoving={true}
                  speed={0.5}
                  padding={10}
                  pauseOnClick = {false}
                  isDraggable = {true}
                  position = {[0,-20,0]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="linechart-container">
        <LineChartDemo
          id='linechart'
          nseries={3}
          nvalues={15}
          isMoving={true}
          margin={[10,0,10,0]}
          vel={2000}
        />
      </div>

      <svg width="0" height="0" className="mysvg">
        <defs>
          <clipPath id="home-path-lg" clipPathUnits="objectBoundingBox">
            <path d="M0,0 C0.571625665,0 0.82163906,0 0.750040184,0 C0.642641871,0 0.730318556,0.527778707 0.543275552,0.727091633 C0.340397591,0.943278282 0.255345434,0.435258964 0,1 C0,1 0,0.666666667 0,0 Z"></path>
          </clipPath>
          <clipPath id="home-path-md" clipPathUnits="objectBoundingBox">
            <path d="M4.96947453e-05,0 C0.615486655,0 0.876223934,0 0.782261533,0 C0.64131793,0 0.756379959,0.669228563 0.510915073,0.921959302 C0.306520698,1.13240383 0.19325617,0.801649307 4.96947453e-05,0.96060638 C-1.65649151e-05,0.96060638 -1.65649151e-05,0.640404254 4.96947453e-05,0 Z"></path>
          </clipPath>
          <clipPath id="home-path-sm" clipPathUnits="objectBoundingBox">
            <path d="M0,0 C0.494569826,0 0.694943346,0 0.601120562,0 C0.460386385,0 0.575277446,0.671365561 0.330177291,0.924903328 C0.197249175,1.06240752 0.102922387,0.9695931 0,0.932210398 C0,0.932210398 0,0.621473598 0,0 Z"></path>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

HeaderTitleImage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default hot(HeaderTitleImage);
