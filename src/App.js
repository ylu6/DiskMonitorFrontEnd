import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MenuAppBar from './component/appbar.js';
import DiskTable from './component/disktable.js';

class App extends Component {
  state = {
    filterEl: 0,
  };

  handleChangeFilter = event => {
    this.setState({
      filterEl: event.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <MenuAppBar filterValue={this.state.filterEl} filterHandler={this.handleChangeFilter}/>
        <DiskTable filterValue={this.state.filterEl}/>
      </div>
    );
  }
}

export default App;
