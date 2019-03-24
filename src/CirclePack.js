import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Circles extends Component {
  componentDidMount=()=>{
    const circlePack=d3.pack().size([1000,1000])(this.props.data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
      
    d3.select('g.nodes')
        .selectAll("circle")
        .data(circlePack.descendants())
        .join("circle")
  }
  color = d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)
  
  render() {
  
    return (
      <div>
        <h1>Circle</h1>
        <svg width="100%" height="1000" >
            <g className='nodes' >
                
            </g>
        </svg>
      </div>
    )
  }
}
