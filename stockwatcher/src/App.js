import React, { Component } from 'react';
import './App.css';
import StockList from './StockList';
import StockManager from './StockManager';
import localStorage from 'local-storage';

const LS_KEY = "stockWatcherStockList";

class App extends Component {
  constructor(props) {
    super(props);
    const localStorageData = localStorage.get(LS_KEY);
    this.state = { stocks: localStorageData || [] }
  }
  addStock = (code) => {
    this.refs.StockList.addStock(code);
  }
  updateAll = () => {
    this.refs.StockList.updateAll();
  }
  render() {
    return (
      <div>
        <div className="title">Stock Watcher</div>
        <StockManager addStock={this.addStock} updateAll={this.updateAll} />
        <StockList ref="StockList" stocks={this.state.stocks} />
      </div>
    );
  }
}

export default App;
