import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import classnames from 'classnames';


export default class Timeline extends Component {
	constructor(props) {
	    super(props);
	 
	    var timelineList = [
			{	
			 	id: 0, 
			 	date: "Nov '08", 
			 	title: 'The big meet',
			 	desc: "The first “hi, hello, goodbye” happens at a bhajan. They don't interact until 2 years later."
			},
			{	
			 	id: 1, 
			 	date: "Nov '10", 
			 	title: 'Getting to know each other',
			 	desc: "Sohum and Vertika start working together as board members of the Indian classical music and dance group on the University of Michigan campus."
			},
			{	
			 	id: 2, 
			 	date: "Apr '11", 
			 	title: 'Confession',
			 	desc: "In the frenzy of final exams, Vertika confesses her “like” to Sohum on the steps facing the central campus Diag. Sohum says “oh”. They start dating shortly after."
			},
			{	
			 	id: 3, 
			 	date: "May '12", 
			 	title: 'With love, from New Jersey',
			 	desc: 'Distance makes the heart grow fonder they say, so Sohum moves to New Jersey after graduating.'
			},
			{	
			 	id: 4, 
			 	date: "Aug '14", 
			 	title: 'West coast best coast',
			 	desc: 'Fondness has grown sufficiently. Sohum and Vertika take their talents to San Francisco.'
			},
			{	
			 	id: 5, 
			 	date: "Nov '15", 
			 	title: 'Carbon bonds',
			 	desc: 'A nerd-tastic proposal and family gathering makes the bond official. The couple is engaged!'
			},
			{	
			 	id: 6, 
			 	date: "July '16", 
			 	title: 'The big day',
			 	desc: "Families will be brought together as Vertika and Sohum become partners in life."
			}
		];

	    this.state = {
	      timelineList: timelineList,
	      currentEp: 0
	    };

	}

	handleClick(ep) {
		this.setState({ currentEp: ep.id });
	}

  render() {
    return (
    	<div id="timelineBlock">
    		<h2>Our Story</h2>
    		<ul id="timelineLine">
	    		{this.state.timelineList.map(function(ep) {
	    			const liClassName = classnames({
					    active: this.state.currentEp == ep.id
				    });
	              return (
	                <li
	                    onClick={this.handleClick.bind(this, ep)}
	                    className={liClassName}
	                    key={ep.id}
	                >
	                	<div id="timelineDate"><label>{ep.date}</label></div>
	                </li>
	              );
	          }.bind(this))}
			</ul> 
			<h3> {this.state.timelineList[this.state.currentEp].title} </h3>
			<div id="event-desc"> 
				{this.state.timelineList[this.state.currentEp].desc}
			</div>
     	</div>
    );
  }
}