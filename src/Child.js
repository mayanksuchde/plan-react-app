import React, { Component } from 'react'

export default class Child extends Component {
    render() {
    const {data,deleteChild,copyChild}=this.props
    return (
      <div className='child'>
        <div className="child__name" >{
            <h5>{data.name}</h5>
        }</div>
        <div className="child__copy" onClick={()=>copyChild(Object.assign(data))}>Copy</div>
        <div className="child__delete" onClick={()=>{deleteChild(data.id)}} >X</div>
        {/* <div className="buttons__edit"></div> if time permits*/}
      </div>
    )
  }
}
