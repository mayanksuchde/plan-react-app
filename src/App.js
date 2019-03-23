import React, { Component } from 'react';
import * as d3 from 'd3';
import {BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
import './App.scss';
import data from './data.json';
import StaticTree from './StaticTree';
import EditForm from './EditForm';
import CirclePack from "./CirclePack";

const  changeNode = (node, id,str) => {
    if(node.id === id) {
      node.name=str
      return node;
    }
    if(node.children) {
      node.children.map(chNode => {
        return changeNode(chNode, id,str);
      });
    }
  
    return node;
  }

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

 
  handleNameSubmit=(e)=>{
    e.preventDefault();
    this.setState({
      nameEdit:e.target.name.value
    })
    const { currentNode, nameEdit } = this.state;
    
    let newdata=changeNode(data,currentNode.id,nameEdit);
    
    this.setState({
      root:d3.hierarchy(newdata)  
    })
  }
  componentDidMount=()=>{
    

  }
  componentDidUpdate=()=>{

  } 


  render() {
    return (
      <div className="App">
        <EditForm node={this.state.currentNode} nameEdit={this.state.nameEdit} handleNameChange={this.handleNameChange} handleNameSubmit={this.handleNameSubmit} />
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
