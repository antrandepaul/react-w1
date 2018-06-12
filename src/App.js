import React, { Component } from 'react';
//import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import DISHES from './shared/dishes.js';
import Menu from './components/MenuComponent';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {dishes: DISHES};
    console.log('app state', this);
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">NavbarBrand name </NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes = {this.state.dishes} />
      </div>
    );
  }
}

export default App;
