import React from 'react';
import { Component } from 'react';
import './Stock.css';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { lastPrice: 0, openValue: 0, lastUpdate: null, name: "", exchange: "", category: "" };
  }
  fetchData = () => {
    fetch("https://api.iextrading.com/1.0/stock/" + this.props.code + "/book")
      .then(response => response.json())
      .then(data => this.setState({
        name: data.quote.companyName,
        exchange: data.quote.primaryExchange,
        category: data.quote.sector,
        openValue:  data.quote.open,
        lastPrice: data.quote.latestPrice,
        lastUpdate: new Date()
      }));
  }
  update = () => {
    this.fetchData();
  }
  componentDidMount = () => {
    this.fetchData();
  }
  getRound(value) {
    return Math.round(value * 100) / 100;
  }
  getVariation = () => {
    var variation = this.getRound(100 * (this.state.lastPrice - this.state.openValue) / this.state.openValue);
    return isNaN(variation) ? 0 : variation;
  }
  getVariationStatus() {
    var variation = this.getVariation();
    if (variation === 0) {
      return "neutral";
    } else if (variation > 0) {
      return "positive";
    } else {
      return "negative";
    }
  }
  getLastUpdate() {
    if (this.state.lastUpdate) {
      return this.state.lastUpdate.toUTCString();
    } else {
      return "Fetching...";
    }
  }
  remove = () => {
    this.props.removeStock(this.props.code);
  }
  render() {
    return (
      <tr className="Stock">
        <td className="code">{this.props.code}</td>
        <td>{this.state.name}</td>
        <td>{this.state.exchange}</td>
        <td>{this.state.category}</td>
        <td>${this.state.openValue}</td>
        <td>${this.state.lastPrice}</td>
        <td className={this.getVariationStatus()}>{this.getVariation()}%</td>
        <td className="lastUpdate">{this.getLastUpdate()}</td>
        <td className="action">
          <button onClick={this.update}>Update</button>
          <button onClick={this.remove}>Remove</button>
        </td>
      </tr>
    );
  }
}

export default Stock;
