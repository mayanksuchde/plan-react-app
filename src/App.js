import React, { Component } from 'react';
import * as d3 from 'd3';
import {BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
import './App.scss';
import data from './data.json';
import StaticTree from './StaticTree';
import EditForm from './EditForm';
import CirclePack from "./CirclePack";

// const  changeNode = (node, id,str) => {
//     if(node.id === id) {
//       node.name=str
//       return node;
//     }
//     if(node.children) {
//       node.children.map(chNode => {
//         return changeNode(chNode, id,str);
//       });
//     }
  
//     return node;
//   }

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      root:d3.hierarchy(data),
      currentNode:{
        state:{},
        props:{},
        children:[]
      },
      nameEdit:"",
      
      
    }
  }
  
  getNode=(d)=>{
    this.setState({
      currentNode:d.data,
      nameEdit:d.data.name
    })
  }
  handleNameChange=(e)=>{
    this.setState({
      nameEdit:e.target.value
    })
  }
  addState=(e)=>{
    e.preventDefault();
    const {root,currentNode}=this.state;
    let name=e.target.name.value;
    let type=e.target.type.value;
    let newroot=Object.assign(root);
    newroot.each(n=>{
      if(n.data.id===currentNode.id){
        n.data.state[name]=type;
      }
      }
    )
    this.setState({
      root:newroot
    })
    e.target.name.value=""
    e.target.type.value=""
  }
  addProps=(e)=>{
    e.preventDefault();
    const {root,currentNode}=this.state;
    let name=e.target.name.value;
    let type=e.target.type.value;
    let newroot=Object.assign(root);
    newroot.each(n=>{
      if(n.data.id===currentNode.id){
        n.data.props[name]=type;
      }
      }
    )
    this.setState({
      root:newroot
    })
    e.target.name.value=""
    e.target.type.value=""

  }
  deleteState=(key)=>{
    const {root, currentNode } = this.state;
    let newroot=Object.assign(root);
    newroot.each(n=>{
      if(n.data.id===currentNode.id){
        delete n.data.state[key]
      }
    });
    this.setState({
      root:newroot
    });
  }
  deleteProps=(key)=>{
    const {root, currentNode } = this.state;
    let newroot=Object.assign(root);
    newroot.each(n=>{
      if(n.data.id===currentNode.id){
        delete n.data.props[key]
      }
    });
    this.setState({
      root:newroot
    });
  }
 
  handleNameSubmit=(e)=>{
    e.preventDefault();
    this.setState({
      nameEdit:e.target.name.value
    })
    const {root, currentNode, nameEdit } = this.state;
    
    let newroot=Object.assign(root);
    newroot.each((n)=>{
      if(n.data.id===currentNode.id){
        n.data.name=nameEdit;
      }
    });
    this.setState({
      root:newroot 
    })
  }
  componentDidMount=()=>{
    

  }
  componentDidUpdate=()=>{

  } 


  render() {
    return (
      <div className="App">
        <EditForm node={this.state.currentNode} 
                  nameEdit={this.state.nameEdit}
                  handleNameChange={this.handleNameChange} 
                  handleNameSubmit={this.handleNameSubmit} 
                  addState={this.addState}
                  addProps={this.addProps}
                  deleteState={this.deleteState}
                  deleteProps={this.deleteProps}
                   />
        <Switch>
          <Route path="/tree" render={(props)=><StaticTree {...props} data={this.state.root} getNode={this.getNode}/>} />
          <Route path='/circle' render={(props)=><CirclePack {...props} data={this.state.root} getNode={this.getNode}/> } /> 
          <Redirect to='/tree' />
        </Switch>
        
      </div>
    );
  }
}

export default App;
