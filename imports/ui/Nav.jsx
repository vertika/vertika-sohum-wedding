import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Tab from './Tab.jsx';
import classnames from 'classnames';


export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDropdown: false
    };
  }

  handleClick (tab) {
    this.props.changeTab(tab);
  }

  handleToggleHamburger(e){
    this.setState({
      activeDropdown: !this.state.activeDropdown
    });
  }

  render() {
    const navClassname = classnames({
      activeDropdown: this.state.activeDropdown
    });

    return (
      <nav className={navClassname}>
        <ul>
          <li><i className="fa fa-bars" onClick={this.handleToggleHamburger.bind(this)}></i></li>
          {this.props.tabList.map(function(tab) {
              return (
                <Tab
                      handleClick={this.handleClick.bind(this, tab)}
                      key={tab.id}
                      scrollId={tab.id}
                      url={tab.url}
                      name={tab.name}
                      isCurrent={(this.props.currentTab === tab.id)}
                />
              );
          }.bind(this))}
          </ul>
      </nav>
    );
  }
}
 
Nav.propTypes = {
  tabList: PropTypes.array,
  currentTab: PropTypes.string,
  changeTab: PropTypes.func
};