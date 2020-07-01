import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import d3 from './d3'
import './styles'

function LineChartDemo(props){

  const init = async () => {
    const svg = d3.select('#' + props.id);
    const height = svg.node().parentElement.clientHeight; //set to svg container height
    const width = svg.node().parentElement.clientWidth; //set svg container width
    const margin = ({top: 20, right: 20, bottom: 30, left: 30});

    //generate the initial series of data from 0 to 100;
    const createDataset = () => {
      let values = [];
      values = Array.from({length: props.nvalues-1}, () => Math.floor(Math.random() * 100));
      values[0] = 50; //first point in the middle for all series
      return values;
    }

    //Modify data array in a range of 0-gap% value
    const updateValues = (values) => {
      let i, v;
      let n_values = [];
      var random = d3.randomInt(0,10);
      debugger;
      n_values = values.map(d => {
        i = random();
        if(i >= 4){
          v = d * (1 + Math.floor(Math.random()*props.gap)/100); //increments value
          if (v > 100) v=100; //set the limit of max value to 100 to avoid scale so much
        }else{
          v = d * (1 - Math.floor(Math.random()*props.gap)/100); //decrements value
        }
        return v
      });

      return n_values;
    };


    //Draw chart function
    const drawchart = () => {
      var data = createDataset();
      debugger;
      let x = d3.scaleLinear()
        .domain([0,props.nvalues-1])
        .range([margin.left, width - margin.right])

      let y = d3.scaleLinear()
        .domain([0, d3.max(data)]).nice()
        .range([height - margin.bottom, margin.top])

      let line = d3.line()
        .defined(d => !isNaN(d))
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveBasis)

      svg.attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible");

      const path = svg.append("g")
        .append("path")
          .datum(data)
          .attr("d", line(data))
          .attr("class","line-1")
          .transition()
          .ease(d3.easeLinear)
          .duration(500)
          .on("start", tick);

      function tick() {
        data = updateValues(data);
        console.log("tick");

        d3.active(this)
          .attr("d", line(data))
          .transition()
            .on("start", tick);
      }

    }

    drawchart();
  }


  useEffect(() => {
    init();
  }, []);


  return <svg className="linechart-demo" id={props.id}/>
}

export default hot(LineChartDemo);


LineChartDemo.propTypes = {
  id: PropTypes.string.isRequired,
  nseries: PropTypes.number.isRequired,
  nvalues: PropTypes.number.isRequired,
  gap: PropTypes.number,
}

LineChartDemo.defaultProps = {
  id: 'linechart',
  nseries: 3,
  nvalues: 10,
  gap: 20,
}
