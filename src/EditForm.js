import React, { Component } from 'react';

import Children from './Children';
import ObjectContainer from './ObjectContainer';

export default class EditForm extends Component {
  constructor(props){
    super (props);
    this.state={

    }
    this.formref= React.createRef();
  }
  
  render() {
    let {node,nameEdit,handleNameChange,handleNameSubmit,addState,addProps,deleteProps,deleteState,addChild,copyChild,deleteChild,onDragOver,onDragStart,onDrop}= this.props;
    
    return (
      <div className='form'>
        <form className='form__name' onSubmit={handleNameSubmit}>
          <input type='text' name="name" value={nameEdit} onChange={handleNameChange} />
          <button type="Submit"><img src="/Icon-1.svg" alt="update"/></button>
        </form>
          
            <div className="state">
              <ObjectContainer header="State"
                               data={node.state} 
                               addData={addState} 
                               generateObjList={this.generateObjList}
                               deleteData={deleteState}
                               onDragStart={onDragStart} /> 
            </div>
            <div className="props">
              <ObjectContainer header="Props" 
                               data={node.props} 
                               addData={addProps} 
                               generateObjList={this.generateObjList}
                               deleteData={deleteProps}
                               onDragStart={onDragStart} /> 
            </div>

            <Children childrenArr={node.children} addChild={addChild} deleteChild={deleteChild} copyChild={copyChild} onDragOver={onDragOver} onDrop={onDrop}  /> 
      </div>
    )
  }
}



