import React, { Component } from 'react';
import {Draggable} from 'react-beautiful-dnd';
const nanoid=require('nanoid');

export default class SingleObj extends Component {
  render() {
      let {name,type,deleteData,onDragStart}=this.props
      let newData={
          name:name,
          type:type
      }
      
    return (
              <div className='container__obj'>
                <div draggable
                    onDragStart={e=>{onDragStart(e,newData)}}
                    className='container__obj__content'>
                    <h6>{name}</h6>
                    <span>{type}</span> 
                </div>
                <button className="delete" onClick={()=>deleteData(name)}>
                  <img src="/bin.svg" alt="delete"/>
                </button>
              </div>
    )
  }
}
