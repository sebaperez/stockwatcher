import React from 'react';
import { Component } from 'react';
import './StockManager.css';

class StockManager extends Component {
  constructor(props) {
    super(props);
    this.refValue = React.createRef();
    this.state = { updateInterval: 15 }
  }
  addStock = (event) => {
    var value = this.refValue.current.value;
    this.props.addStock(value.toUpperCase());
    this.refValue.current.value = "";
  }
  updateAll = () => {
    this.props.updateAll();
  }
  componentDidMount() {
    this.setIntervalValue(this.state.updateInterval);
  }
  onChangeUpdateInterval = (event) => {
    var intervalValue = event.target.value;
    this.setIntervalValue(intervalValue);
  }
  setIntervalValue = (value) => {
    clearInterval(this.intervalId);
    this.setState({ updateInterval: value });
    this.intervalId = setInterval(this.updateAll.bind(this), value * 1000 * 60);
  }
  render() {
    return(
      <div className="StockManager">
        <span>Find stock by symbol:</span>
        <input type="text" ref={this.refValue} />
        <button onClick={this.addStock}>Add</button>
        <div id="updateManager">
        <span id="autoUpdate">
          Update every <input type="text" value={this.state.updateInterval} onChange={this.onChangeUpdateInterval} /> minutes
        </span>
          <button id="updateAll" onClick={this.updateAll}>Update All</button>
        </div>
      </div>
    );
  }
}

export default StockManager;
