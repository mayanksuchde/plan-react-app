import React, { Component } from 'react';
import Children from './Children';
import uuid from 'uuid';

export default class EditForm extends Component {
  constructor(props){
    super (props);
    this.state={

    }
    this.formref= React.createRef();
  }
 
  generateState=(data)=>{
    let arr=[]
    for(let i in data.state){
      arr.push(<li key={uuid()}><span>{i}</span>:<span>{data.state[i]}</span></li>)
    }
    return arr
  }
  componentDidMount=()=>{
    
  }

  componentDidUpdate=()=>{
    
  }
  render() {
    let {node,nameEdit,handleNameChange,handleNameSubmit}= this.props;
    
    return (
      <div className='edit-form'>
        <form onSubmit={handleNameSubmit}>
          <label htmlFor="name"> Component name:
              <input type='text' name="name" value={nameEdit} onChange={handleNameChange} />
          </label>
          <input type="Submit" value="Save" />
        </form>
            <div className="state">
              <h4>State</h4>
              <div className="state__headers">
                <h5>Name:</h5>
                <h5>Data Type:</h5>
              </div>
              <div className="state__list">
                <ul>
                  {this.generateState(node)}
                </ul>
              </div>
              <div className='state__add'>
                <label>
                    <input type='text' name="name"/>
                </label>
                <label>
                    <input type='text' name="datatype"/>
                </label>  
                <button> + </button>
              </div>  
            </div>
            <div className="props">
              <h4>Props</h4>
              <div className="props__headers">
                <h5>Name:</h5>
                <h5>Data Type:</h5>
              </div>
              <div className="props__list">
              
              </div>
              <div className='props__add'>
                <label>
                    <input type='text' name="name"/>
                </label>
                <label>
                    <input type='text' name="datatype"/>
                </label>  
                <button> + </button>
              </div>  
            </div>
            
            <Children childArray={node.children}/>
        
      </div>
    )
  }
}



