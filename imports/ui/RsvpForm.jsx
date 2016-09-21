import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Modal from './Modal.jsx';
import Util from './Util.jsx';
import Scroll from 'react-scroll';
var scroller = Scroll.scroller;

export default class RsvpForm extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		message: '',
    		garbaCountSingular: true,
    		dinnerCountSingular: true,
    		weddingCountSingular: true
    	};
   	}

   	scrollTo(target){
   		scroller.scrollTo(target, {duration: 350, smooth: true});
   	}

   	pluralizeGarba(e) {
   		if(e.currentTarget.value == 1)
   		 	this.setState({garbaCountSingular: true});
   		else 
   			this.setState({garbaCountSingular: false});
   	}
   	pluralizeWedding(e) {
   		if(e.currentTarget.value == 1)
   			this.setState({weddingCountSingular: true});
   		else 
   			this.setState({weddingCountSingular: false});
   	}
	pluralizeDinner(e) {
		if(e.currentTarget.value == 1)
   			this.setState({dinnerCountSingular: true});
   		else 
   			this.setState({dinnerCountSingular: false});
   	}

	handleSubmit(e) {
		e.preventDefault();
		var rsvpForm = this;
		var err = this.inputError();
		if(err) {
			this.setState({
				message: err
			});
		}
		else {
			var obj = {
				fullname: this.refs.fullname.value,
				email: this.refs.email.value,
				weddingCount: this.refs.weddingCount.value,
				garbaCount: this.refs.garbaCount ? this.refs.garbaCount.value:'',
				dinnerCount: this.refs.dinnerCount ? this.refs.dinnerCount.value:'',
				message: this.refs.questions.value
			};
			Meteor.call('responses.insert', obj, function(err){
				if(err){ 
					console.log(err)
					alert(err.message)
				}
				else {
					Meteor.call('sendEmail', 
						obj.fullname,
		                obj.email, 
		                'wedding@vertikaandsohum.com', 
		                'Vertika & Sohum Wedding RSVP Confirmation' 
		            );
					rsvpForm.props.callback();
				}
			});
			this.setState({ message: '' });
		}
		this.scrollTo('rsvpScroll');
	}

	inputError() {
		var err = '';
		if (Util.containsNumber(this.refs.fullname.value)) 
			return 'Whoops, please enter your full name without any numbers'
		if (Util.tooShort(this.refs.fullname.value)) 
			return 'Whoops, please enter your first and last name'
		if (!Util.validateEmail(this.refs.email.value))
			return "Please enter a valid email address";
		if (this.props.garba || this.props.dinner){
			if (!this.refs.garbaCount.value)
				return "Uh oh, you didn't tell us how many people are attending the sangeet";
			if (Util.outOfBounds(this.refs.garbaCount.value))
				return "Please enter between 0 and 12 people for your attendence counts"
		}
		if (!this.refs.weddingCount.value)
			return "Uh oh, you didn't tell us how many people are attending the wedding";
		if (Util.outOfBounds(this.refs.weddingCount.value))
			return "Please enter between 0 and 12 people for your attendence counts"
		if (this.props.dinner){
			if(!this.refs.dinnerCount.value)
				return "Uh oh, you didn't tell us how many people are attending the dinner";
			if(Util.outOfBounds(this.refs.dinnerCount.value))
				return "Please enter between 0 and 10 people for your attendence counts"
		}
		
		return err;
	}

	render() {
	    return (
	    	<div id="rsvpInputBlock" name="rsvpInputBlock">
	    		<form onSubmit={this.handleSubmit.bind(this)} novalidate>
	    			{this.state.message ? 
	    				<span className="message">
		    				<i className="fa fa-exclamation"></i>
		    				{this.state.message}
		    			</span>:''
		    		}
		    		<p>
			    		My full name is <input
					    	type="text"
					        id="fullname"
					        ref="fullname"
					        required
					    />
					</p>
					<p>
			    		My email address is <input
					    	type="email"
					        id="email"
					        ref="email"
					        required
					    />
					</p>
					{ this.props.garba ? 
						<p>
							<input 
								type="number"
								className="attendees"
								id="garbaCount" 
								ref="garbaCount"
								min={0}
					        	max={12}
								required
								onChange={this.pluralizeGarba.bind(this)}
						    /> 
						    { this.state.garbaCountSingular ? 'person':'people'} from my party will attend the <em>sangeet-garba-raas</em> 
						</p> : ''
					}
					<p>
			    		<input
					    	type="number"
					        className="attendees"
					        id="weddingCount"
					        ref="weddingCount"
					        min={0}
					        max={12}
					        required
					        onChange={this.pluralizeWedding.bind(this)}
					    />
					    { this.state.weddingCountSingular ? 'person':'people'} from my party will attend the {this.props.garba ? <em>wedding</em>:'wedding'}
					</p>
					{ this.props.dinner ?
						<p>
						    <input
						    	type="number"
						        className="attendees"
						        id="dinnerCount"
						        ref="dinnerCount"
						        min={0}
					        	max={12}
					        	required
					        	onChange={this.pluralizeDinner.bind(this)}
					        /> 
						    { this.state.dinnerCountSingular ? 'person':'people'} from my party will attend <em>Saturday dinner</em> 
						</p> : ''
					}
					<p id="questionsLabel">Questions or comments:</p>
					<p>
						<textarea 
							id="questions"
							ref="questions"
						/>
					</p>
					<p><button type="submit"> Send </button></p>
				</form>
	     	</div>
	    );
	}
}

RsvpForm.propTypes = {
  callback: PropTypes.func.isRequired,
  dinner: PropTypes.bool.isRequired,
  garba: PropTypes.bool.isRequired
};

/* 
<p id="questionsLabel">Questions or comments:</p>
	<p id="questionsP">
	<span className="fakeunderline" id="fu1"> </span>
	<span className="fakeunderline" id="fu2"> </span>
	<span className="fakeunderline" id="fu3"> </span>
	<span className="fakeunderline" id="fu4"> </span>
	<textarea 
		id="questions"
		ref="questions"
	/>
</p>
*/
/*<p>
	My favorite love/wedding song is <input
    	type="text"
        id="song"
        ref="song"
    /> from <input
    	type="text"
        id="artist"
        ref="artist"
    /> 
</p>*/