import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './data';
export default class Circles extends Component {
  componentDidMount=()=>{
    const circlePack=d3.pack()
                        .size([1000,1000])
                        .padding(3)
                        .radius(d=>d*4)
                      (d3.hierarchy(data)
                          .sum(d => d.value)
                          .sort((a, b) => b.value - a.value));
    console.log(circlePack);
    let color=d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)

    d3.select("svg")
      .select("g")
        .selectAll("circle")
        .data(circlePack.descendants())
        .join("circle")
          .attr("r",d=>d.r)
          .attr("fill", d => d.children ? color(d.depth) : "white")
          
  }
  
  
  render() {
  
    return (
      <div className="circle" >
        <h1>Circle</h1>
        <svg width="800" height="1000" >
            <g  className='nodes'  >
                
            </g>
        </svg>
      </div>
    )
  }
}
