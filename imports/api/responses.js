import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
import moment from 'moment'

export const Responses = new Mongo.Collection('responses');

if (Meteor.isServer) {
  Meteor.publish('responses', function responsesPublication() {
    return Responses.find();
  });
}

Meteor.methods({
  'responses.insert'(obj) {
    check(obj, Object);
    /* other validations here? */

    // Make sure the user is logged in before inserting a task
    console.log('userId: ', Meteor.userId())
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
    Responses.insert({
      fullname: obj.fullname,
      email: obj.email,
      weddingCount: obj.weddingCount,
      garbaCount: obj.garbaCount,
      dinnerCount: obj.dinnerCount,
      message: obj.message,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
      //owner: Meteor.userId(),
      //username: Meteor.user().username,
    });
  }
});