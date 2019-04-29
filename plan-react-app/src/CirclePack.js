import React, { Component } from 'react';
import * as d3 from 'd3';
import data from './data';
export default class Circles extends Component {
  componentDidMount=()=>{
    let pack = data => d3.pack()
    .size([900, 900])
    .padding(3)
    (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))
    let color=d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);
 let root=pack(data);
 console.log(root)
    d3.select("svg")
      .select("g")
        .selectAll("circle")
        .data(root.descendants())
        .join("circle")
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
