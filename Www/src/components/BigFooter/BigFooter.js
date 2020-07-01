import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
import './styles'
import Love20 from "@carbon/icons-react/lib/favorite--filled/20"

const BigFooter = (props) => {
  return(
    <footer>
      <div className='bx--grid'>
        <div className='bx--row'>
          <div className='bx--col-md-2 bx--col-lg-2 footer-legal'>
            <ul>
              <li><a href='#'>Contribute</a></li>
              <li><a href='#'>Privacy</a></li>
              <li><a href='#'>Terms of use</a></li>
              <li><a href='#'>License</a></li>
            </ul>
          </div>
          <div className='bx--col-md-2 bx--col-lg-2 footer-social'>
            <ul>
              <li><a href='#'>Twitter</a></li>
            </ul>
          </div>
          <div className='bx--offset-lg-1 bx--col-sm-3 bx--col-md-4 bx--col-lg-4 footer-info'>
            <p>Have a comment or issue? <a href='#'>Contact me</a> or open an issue on <a href='#'>Github</a></p>
            <p>All1Map is made width <Love20 id="love-icon"/> by <a href='#'>Jose Alberto García</a> Copyright ©2020</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default hot(BigFooter);
