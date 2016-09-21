import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Modal from './Modal.jsx';
import Scroll from 'react-scroll';
var scroller = Scroll.scroller;

export default class Music extends Component {
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

   	closeModal(e) {
    	this.setState({ isModalOpen: false });
  	}

	handleSubmit(e) {
		e.preventDefault();
		var musicForm = this;

		var err = this.inputError();
		if(err) {
			this.setState({
				message: err
			});
		}
		else {
			var obj = {
				song: this.refs["music-song"].value,
				origin: this.refs["music-origin"].value
			};
			Meteor.call('songs.insert', obj, function(err){
				if(err){ 
					console.log(err)
					alert(err.message)
				}
				else {
					musicForm.refs["music-song"].value = null;
					musicForm.refs["music-origin"].value = null;
					musicForm.setState({
						isModalOpen: true,
						message: ''
					});
				}
			});
		}
		this.scrollTo('musicScroll');
	}

	inputError() {
		var err = '';
		if (!this.refs["music-song"].value)
			return "Whoops, you forgot to include a song";
		if (!this.refs["music-origin"].value)
			return "Help us find the song by providing an album or artist";

		return err;
	}

	render() {
	    return (
	    	<div id="musicBlock">
	    		<h2>Music</h2>
	    		{ this.state.message ? 
	    			'' : <p className="subtitle">Help us build our wedding playlist!</p> 
	    		}
	    		<form onSubmit={this.handleSubmit.bind(this)}>
	    			{
	    				this.state.message ? 
	    				<p className="message">
		    				<i className="fa fa-exclamation"></i>
		    				 {this.state.message}
		    			</p>:''
		    		}
		    		My favorite wedding-time jam is <input
				    	type="text"
				        id="music-song"
				        ref="music-song"
				        placeholder="song name"
				        
				    /> from/by <input
				    	type="text"
				        id="music-origin"
				        ref="music-origin"
				        placeholder="album or artist"
				        
				    />
					<p><button type="submit"> Send </button></p>
				</form>
				<Modal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal.bind(this)}>
	                <p>Cool song, thanks for the suggestion!</p>
	            </Modal>
	     	</div>
	    );
	}
}
