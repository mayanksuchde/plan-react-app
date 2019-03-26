import React,{Component } from 'react';


export default class ObjectContainer extends Component{  
    // generateArr=(obj)=>{
    //   let arr=[];
    //   let name="";
    //   for(const i in obj){
    //     name=Object.keys(i);
    //     arr.push({ :obj[i]})
    //   }
    //   return arr;
    // }  
    render(){
      const {header,data,addData,deleteData}=this.props;
      // const objArray=this.generateArr(data);
      // console.log(objArray);
      return (<div>
                  <div className="container__headers">
                    <h4>{header}</h4>
                    <h5>Name:</h5>
                    <h5>Data Type:</h5>
                  </div>
                  <div className="container__list">
                    <ul>
                     {Object.keys(data).map((key,i)=>
                        <li key={i}>
                          <span>{key}</span>:
                          <span>{data[key]}</span>
                          <button className="delete" onClick={()=>deleteData(key)}>X</button>
                        </li>
                     )}
                    </ul>
                  </div>
                    <form className='container__add' onSubmit={addData}>
                      <label htmlFor='name'>
                          <input type='text' name="name"/>
                      </label>
                      <label htmlFor='type'>
                        <select name='type'>
                          <option value="Number">Number</option>
                          <option value="String">String</option>
                          <option value="Array">Array</option>
                          <option value="Object">Object</option>
                          <option value="Function">Function</option>
                        </select>
                      </label>
                      <input type="submit" value="+"/> 
                    </form>
                  </div>)

    } 
  }