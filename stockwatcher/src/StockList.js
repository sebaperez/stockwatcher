import React from 'react';
import { Component } from 'react';
import './StockList.css';
import Stock from './Stock';
import localStorage from 'local-storage';

const LS_KEY = "stockWatcherStockList";

class StockList extends Component {
  constructor(props) {
    super(props);
    const localStorageData = localStorage.get(LS_KEY);
    this.state = { stocks: localStorageData || [] }
  }
  getStocks() {
    return this.state.stocks.map(code => (
      <Stock ref={code} key={code} code={code} removeStock={this.removeStock} />
    ));
  }
  addStock = (code) => {
    var stocks = this.state.stocks;
    stocks.push(code);
    localStorage.set(LS_KEY, stocks);
    this.setState({ stocks: stocks });
  }
  removeStock = (code) => {
    var stocks = this.state.stocks;
    stocks.splice(stocks.indexOf(code), 1);
    localStorage.set(LS_KEY, stocks);
    return this.setState( { stocks: stocks } );
  }
  updateAll = () => {
    return Object.keys(this.refs).forEach(stock => (
      this.refs[stock].update()
    ));
  }
  render() {
    return (
      <div className="StockList">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Exchange</th>
              <th>Category</th>
              <th>Open</th>
              <th>Last price</th>
              <th>Variation</th>
              <th>Last update</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {this.getStocks()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StockList;
