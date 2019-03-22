import React, { Component } from 'react';
import Children from './Children'

export default class EditForm extends Component {
  constructor(props){
    super (props);
    this.state={

    }
    this.formref= React.createRef();
  }
  handleChange=(e)=>{
    
  }
  componentDidMount=()=>{
    
  }

  componentDidUpdate=()=>{
    // if(this.props.node.name){
    //   this.setState({
    //     currentNode:this.props.node
    //   })
     
    // }
  }
  render() {
    let {node}= this.props;
    
    return (
      <div className='edit-form'>
        <form ref={this.formref}>
            <label> Component name:
                <input type='text' name="name" value={node.name||""} onChange={this.handleChange} />
            </label>
            <div className="state">
              <h4>State</h4>
              <div className="state__headers">
                <h5>Name:</h5>
                <h5>Data Type:</h5>
              </div>
              <div className="state__list">
              
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
            
            <Children />
        </form>
      </div>
    )
  }
}



