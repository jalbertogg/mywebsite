import './styles'
import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root'
import { HeaderGlobalAction } from "carbon-components-react/es/components/UIShell";
import Light20 from "@carbon/icons-react/lib/light/20";
import Asleep20 from "@carbon/icons-react/lib/asleep/20";

const ToggleTheme = (props) => {

  const classAsleepIcon =
    (props.theme === 'light') ? 'dark-theme-icon on' : 'dark-theme-icon off';
  const classLightIcon =
    (props.theme === 'light') ? 'light-theme-icon off' : 'light-theme-icon on';

  return(
      <HeaderGlobalAction
        aria-label="Toggle theme"
        title="Toggle Theme"
        className="toggle-theme-btn"
        onClick={props.toggleTheme}>
        <Light20 className={classLightIcon}/>
        <Asleep20 className={classAsleepIcon}/>
      </HeaderGlobalAction>
  )
};

ToggleTheme.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default hot(ToggleTheme);
