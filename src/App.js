import React, { Component } from 'react';
import * as d3 from 'd3';
import {Switch,Route,Redirect } from 'react-router-dom';
import './App.scss';
import data from './data.json';
import StaticTree from './StaticTree';
import EditForm from './EditForm';
import CirclePack from "./CirclePack";
const nanoid=require('nanoid');
// var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));


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
    e.target.name.value='';
  }


  copyChild=(obj)=>{
    const { currentNode } = this.state;
    const changeNode = (node, id,obj) => {
      if(node.id === id) {
        obj.id=nanoid(10)
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
    let newData=changeNode(data,currentNode.id,obj);

    this.setState({
      root:d3.hierarchy(newData)
    })
  }
  onDragStart=(e,obj)=>{
    e.dataTransfer.setData("name",obj.name);
    e.dataTransfer.setData("type",obj.type);
   
  }
  onDragOver=(e)=>{
    e.preventDefault();
  }
  onDrop=(e,id)=>{
    e.preventDefault();
    let name=e.dataTransfer.getData("name");
    let type=e.dataTransfer.getData("type")
    const changeNode = (node, id,name,type) => {
      if(node.id === id) {
        node.props[name]=type;
        return node;
      }
      if(node.children) {
        node.children.map(chNode => {
          return changeNode(chNode, id,name,type);
        });
      }
    
      return node;
    }
    let newData=changeNode(data,id,name,type);

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
  componentDidUpdate=(prevState)=>{
    
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
                  copyChild={this.copyChild}
                  onDragOver={this.onDragOver}
                  onDragStart={this.onDragStart}
                  onDrop={this.onDrop}
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
