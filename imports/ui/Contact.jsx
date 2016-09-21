import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Modal from './Modal.jsx';
import Util from './Util.jsx';
import Scroll from 'react-scroll';
var scroller = Scroll.scroller;

export default class Contact extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		message: '',
    		isModalOpen: false
    	};
   	}

   	scrollTo(target){
   		scroller.scrollTo(target,{duration: 350, smooth: true});
   	}

   	openModal() {
     	this.setState({ isModalOpen: true });
  	}

  	closeModal() {
     	this.setState({ isModalOpen: false });
  	}

	handleSubmit(e) {
		e.preventDefault();
		var contactForm = this;

		var err = this.inputError();
		if(err) {
			this.setState({
				message: err
			});
		}
		else {
			var obj = {
				name: this.refs.contactName.value,
				email: this.refs.contactEmail.value,
				message: this.refs.contactMessage.value
			};
			Meteor.call('messages.insert', obj, function(err){
				if(err){ 
					console.log(err)
					alert(err.message)
				}
				else {
					contactForm.refs.contactName.value = null;
					contactForm.refs.contactEmail.value = null;
					contactForm.refs.contactMessage.value = null;
					contactForm.setState({ 
						isModalOpen: true,
						message: ''
					});
				}
			});
		}
		this.scrollTo('contactScroll');
	}

	inputError() {
		var err = '';
		if (!this.refs.contactMessage.value)
			return "What message do you have for us?";
		if (!this.refs.contactName.value)
			return "Whoops, you didn't tell us your name";
		if (!this.refs.contactEmail.value)
			return "Whoops, you didn't tell us your email address";
		else if (!Util.validateEmail(this.refs.contactEmail.value))
			return "Whoops, that doesn't look like an email address to me";
		return err;
	}

	render() {
	    return (
	    	<div id="contactBlock">
	    		<h2>Contact Us</h2>
	    		{
    				this.state.message ? 
    				<p className="message">
	    				<i className="fa fa-exclamation"></i>
	    				 {this.state.message}
	    			</p>:''
	    		}
	    		<Modal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal.bind(this)}>
	                <p>We received your message, thank you!</p>
	            </Modal>
	    		<form onSubmit={this.handleSubmit.bind(this)}>
		    		<div className="letterHeader">Dear Vertika & Sohum,</div>
		    		<textarea
				        id="contact-message"
				        ref="contactMessage"
				        placeholder="Start typing..."
				        
				    />
				    <div className="letterHeader">With hugs,</div>
				    <input
				    	type="text"
				        id="contact-name"
				        ref="contactName"
				        placeholder="Your name"
				        
				    />
				    <input
				    	
				        id="contact-email"
				        ref="contactEmail"
				        placeholder="Email"
				        
				    />
					<div className="button-container">
						<p><button type="submit">Send</button></p>
					</div>
				</form>
	     	</div>
	    );
	}
}