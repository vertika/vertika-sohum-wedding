import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
import moment from 'moment'

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function responsesPublication() {
    return Messages.find();
  });
}

Meteor.methods({
  'messages.insert'(obj) {
    check(obj, Object);
    /* other validations here? */
    
    Messages.insert({
      name: obj.name,
      email: obj.email,
      message: obj.message,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    });
  }
});