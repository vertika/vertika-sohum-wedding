import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
export default class Hello extends Component {
  render() {
    return (
      <div id="helloBlock">
      	<div id="name">
      		<h1>
            <span>Vertika</span>
            <span id="ampersand"> & </span>
            <span id="sohum">Sohum</span></h1>
      	</div>
      	<div id="date"> 7 . 23 . 16 </div>
      </div>
    );
  }
}