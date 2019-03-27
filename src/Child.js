import React, { Component } from 'react'

export default class Child extends Component {
    
 
    
    render() {
    const {data,deleteChild,copyChild,onDragOver,onDrop}=this.props
    
    return (
      <div>
        <div className='child' onDragOver={(e)=>onDragOver(e)}  onDrop={e=>onDrop(e,data.id)} >
        <div className="child__name" >
                  <h5>{data.name}</h5> 
                </div>
          <div className="child__copy" onClick={()=>copyChild(Object.assign(data))}><img  src='/copy.svg' alt='copy' /></div>
          <div className="child__delete" onClick={()=>{deleteChild(data.id)}} ><img src="/bin.svg" alt="delete"/></div>
        </div>
      </div>
    )
  }
}
