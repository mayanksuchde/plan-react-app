import React, { Component } from 'react';
import * as d3 from 'd3';


export default class Node extends Component {
    constructor(props){
        super(props);
        this.state={
            isNodeOn:false
        }
    }
    componentDidMount=()=>{
    }
    componentDidUpdate(){
        
    }
    render() {
      let {d}=this.props;
        let tl=d3.select("text").textLength;
        
        setTimeout(()=>{
            console.log(tl);
        },3000)
    return (
        
        <g className='node' onClick={()=>this.props.getNode(d)} >
            <rect className='node__rect' x={d.x-55} y={d.y-18} width={110} height="40" rx="11.587" fill="#05386B" stroke="#05386B" strokeWidth="1"/>
            <text className='node__text'x={d.x-10} y={d.y} fill="#5CDB95" fontSize="15" fontFamily="AvenirNext">{this.props.d.data.name}</text>
        </g>
    )
  }
}
