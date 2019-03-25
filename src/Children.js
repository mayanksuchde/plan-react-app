import React, { Component } from 'react'
import Child from './Child';
export default class Children extends Component {
  render() {
    var {childrenArr,addChild,deleteChild,copyChild}=this.props
    return (
      <div>
        <h4>Children</h4>
        {childrenArr.map((child,i)=>
            <Child data={child} key={child.id} deleteChild={deleteChild} copyChild={copyChild} />
          )}
        
      <form onSubmit={addChild}>
        <label htmlFor="name">
          <input type="text" name="name" id="child-name"/>
        </label>
        <input type="submit" value="Add Child"/>
      </form>
      </div>
    )
  }
}

