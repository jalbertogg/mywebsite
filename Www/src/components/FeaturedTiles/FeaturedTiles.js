import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
import HorizontalArticle from './HorizontalArticle'
import VerticalArticle from './VerticalArticle'

const FeaturedTiles = (props) => {
  var articles;

  if (props.align === 'horizontal'){

    articles = props.articles.map( (article,key) => {
      return(
        <div className='bx--col-sm-4' key={key}>
          <HorizontalArticle
            title={article.title}
            subtitle={article.subtitle}
            authorDate={article.authorDate}
            coverText= {article.coverText}
            twitter= {article.twitter}
            maps= {article.maps}
            charts= {article.charts}
          />
        </div>
      );
    });

  } else{

    articles = props.articles.map( (article,key) => {
      return(
        <div className='bx--col-sm-4 bx--col-md' key={key}>
          <VerticalArticle
            title={article.title}
            subtitle={article.subtitle}
            authorDate={article.authorDate}
            coverText= {article.coverText}
            twitter= {article.twitter}
            maps= {article.maps}
            charts= {article.charts}
          />
        </div>
      );
    });
  }

  return (
    <div className='bx--grid bx--articles'>
      <div className='bx--row'>
        {articles}
      </div>
    </div>
  )
};

FeaturedTiles.propTypes = {
  align: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
  articles: PropTypes.array.isRequired,
}

export default hot(FeaturedTiles);
