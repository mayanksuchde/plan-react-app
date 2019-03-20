import React, { Component } from 'react';
import Children from './Children'

export default class EditForm extends Component {
  render() {
    return (
      <div className='edit-form'>
        <form>
            <label> Component name:
                <input type='text' name="name"/>
            </label>
            <label> State:
                <input type='text' name="name"/>
            </label>
            <label> Props:
                <input type='text' name="name"/>
            </label>
            
            <Children />
        </form>
      </div>
    )
  }
}
