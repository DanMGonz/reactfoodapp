import React, { Component } from 'react';
import ScrollUpButton from "react-scroll-up-button";
import logo from './logo.png';
import './App.css';
import Search from './Search';



class App extends Component {
 

  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <img className="App-logo" src={logo} alt=""/>
          <h1 className="App-slogan">What's in your fridge?</h1>
        </header>
          <div className="Search">
            <Search></Search>
          </div>
          <main className="RecipeCards">
          </main>
         <ScrollUpButton style={{width: 75, backgroundColor: 'rgba(6, 96, 58, 1)'}} ToggledStyle={{right: 100}}/>
      </div>
    );
  }
}

export default App;
