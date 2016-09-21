import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


MyTestMap = React.createClass({
  mixins: [ReactMeteorData],
  componentDidMount() {
    // GoogleMaps.load({
    // 	key: 'AIzaSyDs4xXg8t7WqkoqGgtrNdiDQlFVE2YWdPQ'
    // });
  },
  getMeteorData() {
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions()
    };
  },
  _mapOptions() {
    return {
      center: new google.maps.LatLng(42.306154, -83.482879),
      zoom: 16
    };
  },
  render() {
    if (this.data.loaded)
      return <GoogleMap name="mymap" options={this.data.mapOptions} />;

    return <div>Loading map...</div>;
  }
});

GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },
  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: ReactDOM.findDOMNode(this),
      options: this.props.options
    });
    GoogleMaps.ready(this.props.name, function(map) {
    	var infowindow = new google.maps.InfoWindow({
		    content: '<div><h2>Wedding Details</h2>'+
		    '<div className="details">' 
		    	+'<p> July 23, 2016 </p>'
		    	+ '<p>11:00am Baarat <i class="fa fa-circle" aria-hidden="true"></i> 11:30am Ceremony <i class="fa fa-circle" aria-hidden="true"></i> 1:30 pm Lunch</p>'
				+'<p> Canton Hindu Temple, '
				+'44955 Cherry Hill Road,  <br/>'
				+'Canton, MI 48188</p></div>'
			+'</div>'
		  });

	    var marker = new google.maps.Marker({
	        position: map.options.center,
	        title:"Hindu Temple of Canton!",
	        //icon: 'http://www.smithclubla.org/images/blue-heart-icon.png',
	        map: map.instance
	    });
	    
	   //  marker.addListener('click', function() {
		  //   infowindow.open(map.instance, marker);
		  // });
    });
  },
  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    } 
  },
  render() {
    return <div className="map-container"></div>;
  }
});

export default class Details extends Component {
  render() {
    return (
    	<div id="detailsBlock">
		    <div className="wedding-details">
          <h2>Wedding Details</h2>
  		    <p> July 23, 2016 </p>
  		    <p>
  		    	11:00 am Baarat <br/>
  					11:30 am Ceremony <br/>
  					1:30 pm Lunch
  				</p>
  				<p>
  					Canton Hindu Temple <br/>
  					44955 Cherry Hill Road <br/>
  					Canton, MI 48188
  				</p>
          <p className="gift-registry">
            <a href="https://www.amazon.com/wedding/registry/3UKTWZIQA0G10" target="_blank">
              Click here for Gift Registry
            </a>
          </p>
			 </div>
      </div>
    );
  }
}

//<MyTestMap />
//<p className="gift-registry">Coming soon... gift registry information!</p>