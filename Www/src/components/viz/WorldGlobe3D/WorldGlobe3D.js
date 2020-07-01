import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import { hot } from 'react-hot-loader/root'
import {Runtime, Inspector} from "@observablehq/runtime";
import * as versor from 'versor'
import './styles'
import LAND50m from '../../../datasets/land-50m.json'
import LAND110m from '../../../datasets/land-110m.json'
import styles from '../../../theme'
//import d3 from './d3'

const WorldGlobe3D = (props) => {

  function define(runtime, observer) {
    const main = runtime.module();

    main.variable(observer()).define(["DOM","html","visibility"], async function*(DOM,html,visibility)
  {
    const d3 = require("d3");
    const d3geo = require("d3-geo");
    const topojson = require("topojson-client");
    let dpi = window.devicePixelRatio;
    const width = props.width * dpi; //adjust size to device pixels to avoid blur image
    const height = width;
    const padding = props.padding * dpi;
    const sphere = {type: "Sphere"};
    const land110 = topojson.feature(await d3.json(LAND110m), "land");
    const land50 = topojson.feature(await d3.json(LAND50m), "land");
    const projection = d3geo.geoOrthographic().fitExtent([[padding, padding], [width - padding, height - padding]], sphere);
    var pause = false; //flag to no rotate while user interaction
    var dragged = false; //flag to start from same position on pause
    var current_rotation = props.position; //track world rotation and set initial position

    //Drag interactions
    function drag(projection) {
       let v0, q0, r0;

       function dragstarted() {
           v0 = versor.cartesian(projection.invert([d3.event.x, d3.event.y]));
           q0 = versor(r0 = projection.rotate());
       }

       function dragged() {
           const v1 = versor.cartesian(projection.rotate(r0).invert([d3.event.x, d3.event.y]));
           const q1 = versor.multiply(q0, versor.delta(v0, v1));
           current_rotation = versor.rotation(q1);
           projection.rotate(current_rotation);
       }

       return d3.drag()
           .on("start", dragstarted)
           .on("drag", dragged);
    }


    //render world globe
    function render(land) {
      context.clearRect(0, 0, width, height);

      context.beginPath(),
      path(sphere),
      context.fillStyle = "#000",
      context.fill();

      context.beginPath(),
      path(land),
      context.strokeStyle = gradient,
      context.lineWidth = 1.1 * dpi,
      context.stroke();
    }

    //Set Canvas
    var canvas = document.getElementById(props.id);
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    const path = d3geo.geoPath(projection, context);
    const figure = d3.select(canvas);

    // Add gradient color with three color stops
    var gradient = context.createLinearGradient(width/2, 0, width/2, height);
    gradient.addColorStop(0, styles.all1mapCyan50);
    gradient.addColorStop(.5, styles.all1mapYellow50);
    gradient.addColorStop(1, styles.all1mapPink50);

    //drag renders
    function drag_start_render(){
      render(land110);
      pause = true;
      dragged = true;
      d3.select(context.canvas).classed("grabbing", true);
      d3.select(context.canvas).classed("grab", false);
    }

    function drag_end_render(){
      (props.quality === 'LowFi') ? render(land110) : render(land50);
      pause = false;
      dragged = false;
      d3.select(context.canvas).classed("grabbing", false);
      d3.select(context.canvas).classed("grab", true);
    }

    function start_stop(){
      pause = !pause;
      dragged = false;
    }


    //draw world & assign drag methods to canvas
    if(props.isDraggable){
      d3.select(context.canvas)
        .call(drag(projection)
          .on("drag.render", () => drag_start_render())
          .on("end.render", () => drag_end_render()))
        .attr('class','grab')
        .node();
    };

    if(props.isMoving && !props.isDraggable && props.pauseOnClick){
      d3.select(context.canvas)
        .on("click", () => start_stop());
    };


    //rotate world
    if(props.isMoving){
      let i=0;
      let vel=0;
      for (let x = 0; true ; ++x) {
        if(!pause) {
          vel= i * props.speed;
          projection.rotate([current_rotation[0] + vel/10, current_rotation[1], current_rotation[2]]);
          (props.quality === 'LowFi') ? render(land110) : render(land50);
          ++i;
        }else if(dragged) i=0;
        yield figure;
        //await visibility();
      }
    }else{
      d3.select(context.canvas)
        .call((props.quality === 'LowFi') ? render(land110) : render(land50));
    }


  });

    return main;
  }

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(define, Inspector.into(document.getElementById('root')));
  }, []);

  return <canvas id={props.id} />
}


WorldGlobe3D.propTypes = {
  id: PropTypes.string.isRequired,
  quality: PropTypes.oneOf(['LowFi','HiFi']).isRequired,
  isMoving: PropTypes.bool,
  isDraggable: PropTypes.bool,
  pauseOnClick: PropTypes.bool,
  width: PropTypes.number.isRequired,
  speed: PropTypes.number,
  padding: PropTypes.number,
  position: PropTypes.array
}

WorldGlobe3D.defaultProps = {
  id: 'WorldGlobe3D',
  quality: 'LowFi',
  isMoving: false,
  isDraggable: false,
  pauseOnClick: false,
  width:500,
  speed: 1,
  padding: 1,
  position: [0,0,0]
}


export default hot(WorldGlobe3D);
