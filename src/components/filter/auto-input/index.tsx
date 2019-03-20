import React, { Component } from 'react';

interface AutoInputProps {
  searchTerm: string;
  callback: any;
}

/*
  This component triggers a callback after the user has finished typing in it for a set period
  This was to solve the problem of performing a request per key press 
  which caused bugs due to multiple request with no assurance of when each request would finish
*/
class AutoInput extends Component<AutoInputProps, any> {
  timerInterval: any;
  timePerInterval: number
  timeSinceKeyup : number;

  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: ""
    };
    this.timePerInterval = 200;
    this.timeSinceKeyup = 0;
    this.timerInterval = () => {};

    this.startInterval = this.startInterval.bind(this);
  }

  startInterval(e: any) {
    clearInterval(this.timerInterval);
    this.setState({
      searchTerm: e.target.value
    }, () => {
      this.timerInterval = setInterval(() => {this.doneTyping()}, this.timePerInterval);
    });
  }

  doneTyping() {
    if (this.timeSinceKeyup > 500) {
      clearInterval(this.timerInterval);
      this.props.callback("searchTerm", this.state.searchTerm);
    } else {
      this.timeSinceKeyup += this.timePerInterval;
    }
  }

  render() {
    return (
      <input type="text" 
        value={this.state.searchTerm} 
        className="search-input" 
        onChange={(e: any) => {this.startInterval(e)}}
        />  
    )
  }
}

export default AutoInput;