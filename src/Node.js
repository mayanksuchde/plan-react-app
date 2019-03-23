import React, { Component } from 'react';


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
    return (
        
        <g className='node' onClick={()=>this.props.getNode(d)} >
            <rect className='node__rect' x={d.x-55} y={d.y-15} width="110" height="40" rx="11.587" fill="#254e70" stroke="#707070" strokeWidth="1"/>
            <text className='node__text'x={d.x} y={d.y} fill="#8ee3ef" fontSize="15" fontFamily="TrebuchetMS, Trebuchet MS">{this.props.d.data.name}</text>
        </g>
    )
  }
}
