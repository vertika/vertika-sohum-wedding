import React, { Component, PropTypes } from 'react';

import moment from 'moment';


let DateBetween = function(startDate, endDate) {
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let distance = endDate - startDate;
  
  if (distance < 0) {
    return {
	  	days: 0,
	  	hours: 0,
	  	minutes: 0,
	  	seconds: 0
	}
  }

  let days = Math.floor(distance / day);
  let hours = Math.floor((distance % day) / hour);
  let minutes = Math.floor((distance % hour) / minute);
  let seconds = Math.floor((distance % minute) / second);

  return {
  	days: days,
  	hours: hours,
  	minutes: minutes,
  	seconds: seconds
  }
  return between;
}

export default class CountDown extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		remaining: {}
    	};
   	}

  tick() {
    let startDate = new Date();
    let endDate = new Date(this.props.endDate);
    let remaining = DateBetween(startDate, endDate);
    this.setState({remaining: remaining });
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    return (
   		<div id="countdown">
  			<div>
          <div className="countdown-date">{this.state.remaining.days}</div>
  				<div className="countdown-text">days</div>
  			</div>
  			<div>
          <div className="countdown-date">{this.state.remaining.hours}</div>
  				<div className="countdown-text">hours</div>
  			</div>
  			<div>
          <div className="countdown-date">{this.state.remaining.minutes}</div>
  				<div className="countdown-text">minutes</div>
  			</div>
  			<div>
          <div className="countdown-date">{this.state.remaining.seconds}</div>
  				<div className="countdown-text">seconds</div>
  			</div>
        <div id="countdown-end-phrase" className="countdown-text">...until the wedding!</div>
		  </div>
    );
  }
}