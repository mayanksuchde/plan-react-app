import React, { Component } from 'react';
import * as d3 from "d3";
import Node from './Node';

export default class StaticTree extends Component {
    

   

    componentDidMount=()=>{
      
        d3.select('g.nodes')
        .selectAll('g.node')
        .data(this.props.data.descendants())
        .enter()
        .append("g.node")

        d3.select('g.links')
        .selectAll('path')
        .data(this.props.data.links())
            .join("path")
            .attr('d',d3.linkVertical()
                .x(d=>d.x)
                .y(d=>d.y));
            
            
    }
    componentDidUpdate=(prevProps)=>{
      if(this.props.data!==prevProps.data){
      

        d3.select('g.links')
          .selectAll('path')
          .data(this.props.data.links())
              .join("path")
              .attr('d',d3.linkVertical()
                  .x(d=>d.x)
                  .y(d=>d.y));
      
        d3.select('g.nodes')
          .selectAll('g.node')
          .data(this.props.data.descendants())
          .enter()
          .append("g.node")
      }
    }
  
       
    
 
  render() {

    const myTree=d3.tree().size([1000,900])(this.props.data);
   
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.props.data.data))
    return (
      <div className='artboard'>
        <h1>Project</h1>
        <svg width="1000" height="1000" >
            <g className='nodes' transform="translate(0,15)">{
                myTree.descendants().map((d,i)=>
                        <Node d={d} key={i} onClick={this.openPopup} getNode={this.props.getNode} />
                )}
            </g>
            <g className='links'>
                
            </g>
        </svg>
        <a className='download' href={dataStr} download='download.json' ><img src="/download.svg" alt=""/></a>
      </div>
    )
  }
}
