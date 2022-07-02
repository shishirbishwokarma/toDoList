import logo from './logo.svg';
import './App.css';
import React from 'react';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {faMobilePhone} from '@fortawesome/free-solid-svg-icons'


library.add(faTrash);
library.add(faMobilePhone);


class App extends  React.Component {
  constructor (props) {
    super(props);    //call the base class
    this.state= {
      items:[],
      currentItem:
      {text:'',
      key:''
    }
    
    }
    this.handleInput=this.handleInput.bind(this);
    this.addItem=this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  addItem(e){
    e.preventDefault(); //prevents default refresh 
    const newItem = this.state.currentItem ;
    console.log(newItem);
    if (newItem.text!=="")
    {
      const newItems = [...this.state.items,newItem] ; //first params - unpacks the items in list and conversts to individual items , second params is added to the list 
      this.setState ({
        items:newItems,
        currentItem:
      {text:'',
      key:''
    }
      })
    }
  }

  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })

  }

  setUpdate(text,key){
    //console.log("items:"+this.state.items);
    const items = this.state.items;
    items.map(item=>{      
      if(item.key===key){
        //console.log(item.key +"    "+key)
        item.text= text;
      }
    })
    this.setState({
      items: items
    })
    
   
  }


  render () {
    return (
      <div className='App'>
        <header>
        <form id = "meeting-topics" onSubmit={this.addItem}>
          <input type= "text" placeholder ="Enter To Do List" 
          value={this.state.currentItem.text}
          onChange={this.handleInput}></input>
          <button type ="submit"> Add </button>


        </form>
      </header>
      <ListItems items = {this.state.items}
        deleteItem={this.deleteItem}
        setUpdate={this.setUpdate}
        ></ListItems>
       
    
      </div>
      
    );
  }

}
export default App;
