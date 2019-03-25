import React, { Component } from 'react';
import * as d3 from 'd3';
import {BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
import uuid from 'uuid';
import './App.scss';
import data from './data.json';
import StaticTree from './StaticTree';
import EditForm from './EditForm';
import CirclePack from "./CirclePack";
const nanoid=require('nanoid');
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
        children:[],
        id:""
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
  addChild=(e)=>{
    e.preventDefault();
    const { currentNode } = this.state;
    
    let name=e.target.name.value;
    let newChild={
      name:name,
      id:nanoid(),
      children:[],
      state:{},
      props:{}
    }
   const changeNode = (node, id,obj) => {
          if(node.id === id) {
            node.children.push(obj)
            return node;
          }
          if(node.children) {
            node.children.map(chNode => {
              return changeNode(chNode, id,obj);
            });
          }
        
          return node;
        }
    let newData=changeNode(data,currentNode.id,newChild);
   
    this.setState({
      root:d3.hierarchy(newData)
    })
     
  }
  deleteChild=(id)=>{
    const { currentNode } = this.state;
    
    let newChildren=currentNode.children.filter((child)=>{
      return child.id!==id;
    });
    const changeNode = (node, id,obj) => {
      if(node.id === id) {
        node.children=newChildren
        return node;
      }
      if(node.children) {
        node.children.map(chNode => {
          return changeNode(chNode, id,obj);
        });
      }
    
      return node;
    }
    let newData=changeNode(data,currentNode.id,currentNode);

    this.setState({
      root:d3.hierarchy(newData)
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
                  addChild={this.addChild}
                  deleteChild={this.deleteChild}
                   />
        <Switch>
          <Route path="/tree" render={(props)=><StaticTree {...props} 
                                                  data={this.state.root} 
                                                  getNode={this.getNode}/>} 
                                                  currentNode={this.state.currentNode} />
          <Route path='/circle' render={(props)=><CirclePack {...props} data={this.state.root} getNode={this.getNode}/> } /> 
          <Redirect to='/tree' />
        </Switch>
        
      </div>
    );
  }
}

export default App;
