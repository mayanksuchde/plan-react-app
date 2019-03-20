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
      data:d3.hierarchy(data)
    }
  }
  

  componentDidMount=()=>{
    

  }
  render() {
    return (
      
      <div className="App">
        <EditForm />
        <StaticTree  data={this.state.data} />
      </div>
    );
  }
}

export default App;
