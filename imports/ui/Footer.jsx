import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import CountDown from './CountDown.jsx';

export default class Details extends Component {
  render() {
    return (
    	<footer>
    		<CountDown endDate='07/23/2016 11:00 AM' />
    		<p id="footer-copyright">
    			<i className="fa fa-copyright" aria-hidden="true"></i> Vertika & Sohum
    		</p>
     	</footer>
    );
  }
}