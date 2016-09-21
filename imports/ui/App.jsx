import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Nav from './Nav.jsx';
import Block from './Block.jsx';
import Hello from './Hello.jsx';
import Timeline from './Timeline.jsx';
import Pictures from './Pictures.jsx';
import Details from './Details.jsx';
import Rsvp from './Rsvp.jsx';
import Music from './Music.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
    super(props);
 
    var tabList = [
      { 'id': 'story', 'name': 'Our Story', 'url': '/story' },
      { 'id': 'pictures', 'name': 'Gallery', 'url': '/pictures' },
      { 'id': 'wedding', 'name': 'Wedding Details', 'url': '/wedding' },
      // { 'id': 'music', 'name': 'Music', 'url': '/music' },
      { 'id': 'rsvp', 'name': 'RSVP', 'url': '/rsvp' },
      { 'id': 'contact', 'name': 'Contact Us', 'url': '/contact' }
    ];

    this.state = {
      tabList: tabList,
      currentTab: 'home'
    };

  } 

  changeTab(tab) {
    this.setState({ currentTab: tab.id });
    ReactDOM.findDOMNode(this.refs[tab.id]).scrollIntoView({block: "end", behavior: "smooth"})
  }

  componentWillMount(){
    
  }

  render() {
    return (
      <div>
        <Nav 
          currentTab={this.state.currentTab}
          tabList={this.state.tabList}
          changeTab={this.changeTab.bind(this)}
        />
        <Block blockNum={1} ><Hello /></Block>
        <Block blockNum={2} ref="story" scrollId={"story"}><Timeline /></Block>
        <Block blockNum={3} ref="pictures" scrollId={"pictures"}><Pictures /></Block>
        <Block blockNum={4} ref="wedding" scrollId={"wedding"}><Details /></Block>
        <Block blockNum={5} ref="rsvp" scrollId={"rsvp"}><Rsvp /></Block>
        <Block blockNum={6} ref="music" scrollId={"music"}><Music /></Block>
        <Block blockNum={7} ref="contact" scrollId={"contact"}><Contact /></Block>
        <Block blockNum={8}><Footer /></Block>
      </div>
    );
  }
}
