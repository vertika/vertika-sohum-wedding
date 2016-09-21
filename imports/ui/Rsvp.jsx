import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
 
import RsvpForm from './RsvpForm.jsx';
import Modal from './Modal.jsx';

export default class Rsvp extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      passValue: '',
	      signedIn: false,
	      garba: false,
	      dinner: false,
	      tryAgain: false,
	      completedRsvp: false,
	      isModalOpen: false
	    };
	}

	openModal() {
     	this.setState({ isModalOpen: true });
  	}

  	closeModal() {
     	this.setState({ isModalOpen: false });
  	}
	
	handleChange(e) {
	    this.setState({passValue: e.target.value});
	}

	handleLogin(e) {
		e.preventDefault();
		var comp = this;
		var password = this.state.passValue;
		Meteor.call('loginGuest', password, function(err, username){
			//console.log('username is: ' + username)
			if(err) { 
				console.log(err);
				comp.setState({
	                tryAgain: true
	            });
			}
			else {
				Meteor.loginWithPassword(username, password, function(err){
			        if(err){
			            console.log(err);
			            // proper error handling
			        } 
			        else { 
			        	console.log(username)
			        	var newState = {
			        		signedIn: true
			        	};
			        	if(username == 'three'){ 
			        		newState.garba = true;
			        		newState.dinner = true;
			        	}
			        	else if(username == 'two'){
			        		newState.garba = true;
			        	}
			            comp.setState(newState);
			        }
			    });
			}
		});
	}

	markedRsvpCompleted() {
		this.setState({
			//completedRsvp: true,
			signedIn: false,
			isModalOpen: true,
			passValue: ''
		});
		Meteor.logout(function(err){
			console.log(err)
		});
	}

	/*handleSubmitCreate(e) {
		e.preventDefault();
		console.log(this.refs.registerUsername.value)
		console.log(this.refs.registerPassword.value)
		Accounts.createUser({
            username: this.refs.registerUsername.value,
            password: this.refs.registerPassword.value
        });
	}

	<form onSubmit={this.handleSubmitCreate.bind(this)}>
		<input type="text" name="registerUsername" ref="registerUsername" placeholder="username"/>
		<input type="text" name="registerPassword" ref="registerPassword" placeholder="password"/>
		<input type="submit" value="Register" />
	</form>*/

	render() {
	    return (
	    	<div id="rsvpBlock">
	    		<h2>R.S.V.P.</h2>
	    		{ !this.state.signedIn && !this.state.completedRsvp ? 
	    			<span>
	    				{ this.state.tryAgain ?
					   		<span className="message">
			   					<i className="fa fa-exclamation"></i>
			   					Whoops, that's not the password. Check your RSVP card.
					   		</span>
							: <p className="message">(Psst... the password can be found on your invitation RSVP card)</p>
						}
				    	<form onSubmit={this.handleLogin.bind(this)}>
					    	<p>
					    		<input
							    	type="text"
							    	placeholder="password"
							        value={this.state.passValue}
							        onChange={this.handleChange.bind(this)}
							        id="password"
							    />
							    <button>Go</button>
							</p> 
					   	</form>
					</span>
				    : ''
				}
			    {this.state.signedIn ? 
			    	<RsvpForm 
			    		callback={this.markedRsvpCompleted.bind(this)} 
			    		garba={this.state.garba}
			    		dinner={this.state.dinner} />
			    	:''
				}
			    {this.state.completedRsvp ? 
			    	<div className="message thanks">
			    		Thanks for your response <i className="fa fa-smile-o"> You should receive an email confirmation shortly.</i>
			    	</div>:''
			   	}
			   	<Modal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal.bind(this)}>
	                <p>We received your RSVP, thank you!
	                <br/>Expect an email confirmation shortly.</p>	            
	            </Modal>
	     	</div>
	    );
	}
}