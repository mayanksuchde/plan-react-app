import React, { Component } from 'react';
import * as d3 from "d3";
import Node from './Node';
import Popup from 'reactjs-popup'
export default class StaticTree extends Component {
    constructor(props){
        super(props);
        this.state={
            data:this.props.data,
            open:false
        }

    }

    openPopup(){
        console.log('whoasodaosdoasd')
      
    }
   

    componentDidMount=()=>{
        d3.select('g.nodes')
            .selectAll('g.node')
            .data(this.state.data.descendants())
            .enter()
            .append("g.node")

        d3.select('g.links')
        .selectAll('path')
        .data(this.state.data.links())
            .join("path")
            .attr('d',d3.linkVertical()
                .x(d=>d.x)
                .y(d=>d.y));
            
            
    }
  
       
    
 
  render() {

    const myTree=d3.tree().size([1000,900])(this.state.data);
   
    
    return (
      <div className='artboard'>
        <h1>Project Untitled</h1>
        <svg width="100%" height="1000" >
            <g className='nodes' transform="translate(0,15)">{
                myTree.descendants().map((d,i)=>
                    <>
                        <Node d={d} key={i} onClick={this.openPopup} getNode={this.props.getNode} />
                    </>
                )}
            </g>
            <g className='links'>
                
            </g>
        </svg>
      </div>
    )
  }
}
