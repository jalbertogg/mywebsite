import "./global"
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root'
import {Helmet} from "react-helmet";
import { useTheme } from "./hooks/useTheme";
import { Content } from "carbon-components-react/es/components/UIShell";
import GlobalHeader from './components/GlobalHeader'
import Favicon16 from './images/favicon/favicon-16.png'
import Favicon32 from './images/favicon/favicon-32.png'
import Favicon96 from './images/favicon/favicon-96.png'
import Favicon128 from './images/favicon/favicon-128.png'
import Favicon192 from './images/favicon/favicon-192.png'
import Favicon196 from './images/favicon/favicon-196.png'
import Favicon152 from './images/favicon/favicon-152.png'
import Favicon180 from './images/favicon/favicon-180.png'
import FaviconSVG from './images/favicon/faviconSVG.svg'
import Browserconfig from './images/favicon/browserconfig.xml'
import Home from './pages/Home'
import Theme from './pages/Theme'
import Error from './pages/Error'
import Tests from './pages/Tests'

const App = () => {
  const [theme, toggleTheme, componentMounted] = useTheme();

  if(!componentMounted){
    return <div />
  }

  return (
    <>
    <Helmet
    defaultTitle="All1Map"
    titleTemplate="%s | All1Map">
        <html lang="en" />
        <meta charset="UTF-8" />
        <meta name="description" content="A catalog of useful tools to inspire, discover, and enjoy with real data visualisations and maps" />
        <link rel="canonical" href="http://www.all1map.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <link rel="icon" href={Favicon16} sizes="16x16" />
        <link rel="icon" href={Favicon32} sizes="32x32" />
        <link rel="icon" href={Favicon96} sizes="96x96" />
        <link rel="icon" href={Favicon128} sizes="128x128" />
        <link rel="icon" href={Favicon192} sizes="192x192" />
        <link rel="shortcut icon" href={Favicon196} sizes="196x196" />
        <link rel="apple-touch-icon" href={Favicon152} />
        <link rel="apple-touch-icon" href={Favicon180} />
        <link rel="mask-icon" href={FaviconSVG} />
        <meta name="msapplication-config" content={Browserconfig} />
    </Helmet>
    <GlobalHeader theme={theme} toggleTheme={toggleTheme}/>
    <Content>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/theme" component={Theme} />
          <Route path="/tests" component={Tests} />
          <Route component={Error} />
      </Switch>
    </Content>
    </>
  );
}

export default hot(App);
