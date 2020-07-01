import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import d3 from './d3'
import './styles'
import Unemployment from '../../../datasets/unemployment.tsv'

function LineChart(props){

  const init = async () => {
    const svg = d3.select('#' + props.id);
    const height = svg.node().parentElement.clientHeight; //set to svg container height
    const width = svg.node().parentElement.clientWidth; //set svg container width
    const margin = ({top: 20, right: 20, bottom: 30, left: 30});

    const getdata = async () => {
      const data = await d3.tsv(Unemployment);
      const columns = data.columns.slice(1);
      return {
        y: "% Unemployment",
        series: data.map(d => ({
          name: d.name.replace(/, ([\w-]+).*/, " $1"),
          values: columns.map(k => +d[k])
        })),
        dates: columns.map(d3.utcParse("%Y-%m"))
      };
    }

    var data = await getdata();

    var y = d3.scaleLinear()
      .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
      .range([height - margin.bottom, margin.top])

    var x = d3.scaleUtc()
      .domain(d3.extent(data.dates))
      .range([margin.left, width - margin.right])

    var yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(data.y))

    var xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    var line = d3.line()
      .defined(d => !isNaN(d))
      .x((d, i) => x(data.dates[i]))
      .y(d => y(d))


    function hover(svg, path) {
      if ("ontouchstart" in document) svg
          .style("-webkit-tap-highlight-color", "transparent")
          .on("touchmove", moved)
          .on("touchstart", entered)
          .on("touchend", left)
      else svg
          .on("mousemove", moved)
          .on("mouseenter", entered)
          .on("mouseleave", left);

      const dot = svg.append("g")
          .attr("display", "none");

      dot.append("circle")
          .attr("r", 2.5);

      dot.append("text")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .attr("y", -8);

      function moved() {
        const mouse = d3.mouse(this);
        const xm = x.invert(mouse[0]);
        const ym = y.invert(mouse[1]);
        const i1 = d3.bisectLeft(data.dates, xm, 1);
        const i0 = i1 - 1;
        const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
        const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
        path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
        dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
        dot.select("text").text(s.name);
      }

      function entered() {
        path.style("mix-blend-mode", null).attr("stroke", "#ddd");
        dot.attr("display", null);
      }

      function left() {
        path.style("mix-blend-mode", "multiply").attr("stroke", null);
        dot.attr("display", "none");
      }
    }


    svg.attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    const path = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
      .selectAll("path")
      .data(data.series)
      .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("d", d => line(d.values));

    svg.call(hover, path);
  }


  useEffect(() => {
    init();
  }, []);


  return <svg className="linechart" id={props.id}/>
}

export default hot(LineChart);


LineChart.propTypes = {
  id: PropTypes.string.isRequired,
}

LineChart.defaultProps = {
  id: 'linechart',
}
