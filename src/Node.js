import React, { Component } from 'react';
import * as d3 from 'd3';

export default class Node extends Component {
    constructor(props){
        super(props);
        this.state={
            width:"84.974",
            height:"23.175"
        }
    }
    componentDidMount(){
        this.expandNode=(d,i)=>{
            d3.select("g.node")
                .attr("width","150")
                .attr("height","300")
        }

        d3.selectAll("g.node")
            .on('mouseover',this.expandNode)
    }
    render() {
      let {d}=this.props;

    return (
        <g className='node' >
            <rect className='node__rect' x={d.x-40} y={d.y-15} width={this.state.width} height={this.state.height} rx="11.587" fill="#254e70" stroke="#707070" strokeWidth="1"/>
            <text className='node__text'x={d.x} y={d.y} fill="#8ee3ef" fontSize="15" fontFamily="TrebuchetMS, Trebuchet MS">{this.props.d.data.name}</text>
        </g>
    )
  }
}
