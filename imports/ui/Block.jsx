import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import classnames from 'classnames';

import Scroll from 'react-scroll';

scroll = Scroll.animateScroll;
 var Element = Scroll.Element;

// Task component - represents a single todo item
export default class Block extends Component {

  render() {
    const blockClassNames = classnames({
      helloContainer: this.props.blockNum == 1,
      darkBackground: this.props.blockNum == 5,
      lightBackground: !(this.props.blockNum % 2),
      medBackground: this.props.blockNum == 3 || this.props.blockNum == 7,
      block: true,
      element: true
    });
    return (
        <div id={this.props.scrollId + 'Scroll'} className={blockClassNames}>{this.props.children}</div>
    );
  }
}
 
Block.propTypes = {
  blockNum: PropTypes.number,
  scrollId: PropTypes.string
};