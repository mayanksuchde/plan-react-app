import React, { Component } from 'react'

export default class Children extends Component {
  render() {
    var {childArray}=this.props
    return (
      <div>
        <h4>Children</h4>
        {childArray.map((child,i)=>
            <div key={i}>
              <h5>{child.name}</h5>
            </div>
          )}
      </div>
    )
  }
}

