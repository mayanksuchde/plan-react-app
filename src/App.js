import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.scss';
import data from './data.json';
import StaticTree from './StaticTree';
import EditForm from './EditForm';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      root:d3.hierarchy(data),
      node:{}
      
    }
  }
  
  getNode=(d)=>{
    this.setState({
      node:d.data
    })
  }
  componentDidMount=()=>{
    

  }

  
  render() {
    return (
      
      <div className="App">
        <EditForm node={this.state.node}/>
        <StaticTree  data={this.state.root} getNode={this.getNode}/>
      </div>
    );
  }
}

export default App;
