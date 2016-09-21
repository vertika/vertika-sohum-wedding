import React, { Component, PropTypes, ReactWithAddons} from 'react';
import { Meteor } from 'meteor/meteor';

//import { ReactCSSTransitionGroup } from 'react-addons-css-transition-group';

export default class Modal extends Component {
  render() {
    if(this.props.isModalOpen){
        return (
          <div className="modal">
            <div className="modal-box">
              <button onClick={this.props.closeModal}>
                <i className="fa fa-times-circle-o" aria-hidden="true"></i>
              </button>
              <div className="modal-content">{this.props.children}</div>
            </div>
          </div>
        );
    } 
    else {
        return <div />;
    }
  }
}
 
Modal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func
};