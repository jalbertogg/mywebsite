import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root';
import { ClickableTile } from "carbon-components-react/es/components/Tile";
import './vertical-article_styles'
import Twitter20 from "../Icons/TwitterIcon/20";
import Report20 from "@carbon/icons-react/lib/report--data/20";
import Earth20 from "@carbon/icons-react/lib/earth--filled/20";

const VerticalArticle = (props) => {
  var icons = [];
  if (props.twitter) icons.push(<Twitter20 aria-label="twitter data" title="It contains twitter data"/>);
  if (props.maps) icons.push(<Earth20 aria-label="maps data" title="It contains maps data"/>);
  if (props.charts) icons.push(<Report20 aria-label="data visualisations" title="It contains data visualisations"/>);

  return (
    <div className="bx--article-card-vertical">
      <ClickableTile
        href="#"
      >
        <div className='bx--article-card__img bx--aspect-ratio bx--aspect-ratio--2x1'>
          <div className='bx--aspect-ratio--object cover'>
            <span>{props.coverText}</span>
            {icons}
          </div>
        </div>
        <div className='bx--article-card__details'>
          <h3 className='bx--article-card-title'>{props.title}</h3>
          <p className='bx--article-card-subtitle'>{props.subtitle}</p>
          <p className='bx--article-card-author-date'>{props.authorDate}</p>
        </div>
      </ClickableTile>
    </div>
  );
};

VerticalArticle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  authorDate: PropTypes.string.isRequired,
  coverText: PropTypes.string.isRequired,
  twitter: PropTypes.bool,
  maps: PropTypes.bool,
  charts: PropTypes.bool
}

export default hot(VerticalArticle);
