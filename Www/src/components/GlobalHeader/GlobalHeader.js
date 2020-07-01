import './styles'
import React from 'react'
import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link } from "react-router-dom"
import {
  HeaderContainer,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  HeaderSideNavItems,
  SideNavItems
} from "carbon-components-react/es/components/UIShell"
import ToggleTheme from "../ToggleTheme"
import BrandIcon from '../../images/favicon/favicon-16'

const GlobalHeader = (props) => {
  var isExpanded = false;

  const hideSideNav = () => {
    var sidenav = document.getElementsByClassName('global_sidenav');
    sidenav[0].classList.remove('bx--side-nav--expanded');
    console.log("clicked",sidenav[0])
  };

  const changeTheme = () => {
    props.toggleTheme();
    if (isExpanded) {
      var headerMenuBtn = document.getElementsByClassName('bx--header__menu-toggle')[0];
      headerMenuBtn.click();
    }
  };

  return (
    <>
    <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => {
            window.addEventListener(
              'resize',
              () => {
                const viewportWidth =
                  window.innerWidth || document.documentElement.clientWidth;
                if (viewportWidth > 1056) {
                  if (isSideNavExpanded === true) onClickSideNavExpand();
                }
              },
              false
            );

            isExpanded = isSideNavExpanded;

            return (
              <Fragment>
                <Header
                  aria-label="JoseAlberto"
                  onClick={ isSideNavExpanded === true ? onClickSideNavExpand : null}
                  >
                  <SkipToContent />
                  <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                  />
                  <HeaderName element={NavLink} to="/" prefix="" className="brand-font">
                    <img src={BrandIcon} className="brand-icon" alt=""/> Jose Alberto
                  </HeaderName>
                  <HeaderNavigation aria-label="Carbon Tutorial">
                    <HeaderMenuItem element={NavLink} to="/about">About</HeaderMenuItem>
                    <HeaderMenuItem element={NavLink} to="/help">Help</HeaderMenuItem>
                    <HeaderMenuItem element={NavLink} to="/contact">Contact</HeaderMenuItem>
                    <HeaderMenuItem element={NavLink} to="/theme">Theme</HeaderMenuItem>
                    <HeaderMenuItem element={NavLink} to="/tests">Tests</HeaderMenuItem>
                  </HeaderNavigation>
                  <SideNav
                    aria-label="Side navigation"
                    expanded={isSideNavExpanded}
                    isPersistent={false}
                    className="global_sidenav">
                    <SideNavItems>
                      <HeaderSideNavItems>
                        <HeaderMenuItem element={NavLink} to="/about" onClick={hideSideNav}>About</HeaderMenuItem>
                        <HeaderMenuItem element={NavLink} to="/help" onClick={hideSideNav}>Help</HeaderMenuItem>
                        <HeaderMenuItem element={NavLink} to="/contact" onClick={hideSideNav}>Contact</HeaderMenuItem>
                        <HeaderMenuItem element={NavLink} to="/theme" onClick={hideSideNav}>Theme</HeaderMenuItem>
                        <HeaderMenuItem element={NavLink} to="/tests" onClick={hideSideNav}>Tests</HeaderMenuItem>
                      </HeaderSideNavItems>
                    </SideNavItems>
                  </SideNav>
                </Header>
              </Fragment>
          )}}
        />
    <ToggleTheme theme={props.theme} toggleTheme={changeTheme}/>
    </>
  )
};

GlobalHeader.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default GlobalHeader;
