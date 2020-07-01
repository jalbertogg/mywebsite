import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root';
import './styles'

const TitleImage = (props) => {
  return (
    <div className='title-image'>
      <div className='bx--grid'>
        <div className='bx--row'>
          <div className='bx--col-sm-4 bx--col-md-4 bx--col-lg-7 bx--col-xlg-6'>
            <h1 className='title'>{props.title}</h1>
            <p className='subtitle'>{props.subtitle}</p>
          </div>
          <div className='bx--col-sm-4 bx--col-md-4 bx--col-lg-8 bx--offset-lg-1 bx--offset-xlg-2 bx--offset-max-2 bx--aspect-ratio bx--aspect-ratio--16x9'>
            <img className='bx--aspect-ratio--object image' src={props.imgSrc} alt={props.imgAlt} />
          </div>
        </div>
      </div>
    </div>
  )
}

TitleImage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired
}

export default hot(TitleImage);
