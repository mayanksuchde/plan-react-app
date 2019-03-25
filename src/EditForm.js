import React, { Component } from 'react';
import Children from './Children';
import ObjectContainer from './ObjectContainer';
import uuid from 'uuid';

export default class EditForm extends Component {
  constructor(props){
    super (props);
    this.state={

    }
    this.formref= React.createRef();
  }
 
  
  componentDidMount=()=>{
    
  }

  componentDidUpdate=()=>{
    
  }
  render() {
    let {node,nameEdit,handleNameChange,handleNameSubmit,addState,addProps,deleteProps,deleteState,addChild,deleteChild}= this.props;
    
    return (
      <div className='edit-form'>
        <form onSubmit={handleNameSubmit}>
          <label htmlFor="name"> Component name:
              <input type='text' name="name" value={nameEdit} onChange={handleNameChange} />
          </label>
          <input type="Submit" value="Save" />
        </form>
            <div className="state">
              <ObjectContainer header="State"
                               data={node.state} 
                               addData={addState} 
                               generateObjList={this.generateObjList}
                               deleteData={deleteState} /> 
            </div>
            <div className="props">
              <ObjectContainer header="Props" 
                               data={node.props} 
                               addData={addProps} 
                               generateObjList={this.generateObjList}
                               deleteData={deleteProps} /> 
            </div>
            
            <Children childrenArr={node.children} addChild={addChild} deleteChild={deleteChild}  />
        
      </div>
    )
  }
}



