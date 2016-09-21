import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import Scroll from 'react-scroll';
scroll = Scroll.animateScroll;

var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;

export default class Tab extends Component {
  handleClick(e){
    e.preventDefault();
    this.props.handleClick();
  }

  render() {
    return (
      <li className={this.props.isCurrent ? 'current' : null}>
         {this.props.name}
      </li>
    );
  }


// <DirectLink to={this.props.scrollId + 'Scroll'} spy={true} smooth={true} duration={500}>
//         {this.props.name}
//       </DirectLink>
}
 
Tab.propTypes = {
  isCurrent: PropTypes.bool,
  url: PropTypes.string,
  name: PropTypes.string,
  scrollId: PropTypes.string,
  handleClick: PropTypes.func
};