import React, { Component } from 'react'

export default class Child extends Component {
    state={
      hasProps:false
    }
    handleDrop=(e,id)=>{
      let data=this.props;
      this.setState({
        hasProps:true
      })
      return  this.props.onDrop(e,data.id)
    }
    componentDidUpdate(prevProps){
      if(this.props!==prevProps){
        this.forceUpdate();
      }
    }
    
    render() {
    const {data,deleteChild,copyChild,onDragOver,onDrop}=this.props
    let content;
      if(this.state.hasProps){
        content=<div className="child__nameandprops" >
                  <h5>{data.name}</h5>
                  <ul>{Object.keys(data.props).map(item=><li>{item}</li>)}</ul>
                </div>;
        
      }else{
        content=<div className="child__name" >
                  <h5>{data.name}</h5>
                </div>
      }
    return (
      <div>
        <div className='child' onDragOver={(e)=>onDragOver(e)}  onDrop={e=>this.handleDrop(e,data.id)} >
          {content}
          <div className="child__copy" onClick={()=>copyChild(Object.assign(data))}><img  src='/copy.svg' alt='copy' /></div>
          <div className="child__delete" onClick={()=>{deleteChild(data.id)}} ><img src="/bin.svg" alt="delete"/></div>
        </div>
      </div>
    )
  }
}
