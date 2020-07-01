import './styles'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import BigFooter from '../../components/BigFooter'
import HeaderTitleImage from '../../components/HeaderTitleImage'
import FeaturedTiles from '../../components/FeaturedTiles'
import { Link } from 'react-router-dom';

const Home = () => {


  return (
    <>
      <HeaderTitleImage
        title='All1Map'
        subtitle='A catalog of useful tools to inspire, discover, and enjoy with real data visualisations and maps'
      />
      <FeaturedTiles
        align='horizontal'
        articles= {[
          {
            title: 'COVID-19: What was said vs pandemic evolution',
            subtitle: 'Explore what was said on Twitter by the OMS and each country government at each time, comparing how was the state of the virus in the world with the actions taken',
            authorDate: 'Jose Alberto, May 2020',
            coverText: 'COVID-19',
            twitter: true,
            maps: true,
            charts: true
          }
        ]}
      />
      <BigFooter />
    </>
  );
};

export default hot(Home);
