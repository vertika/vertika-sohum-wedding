import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
import moment from 'moment'

export const Songs = new Mongo.Collection('songs');

if (Meteor.isServer) {
  Meteor.publish('songs', function responsesPublication() {
    return Songs.find();
  });
}

Meteor.methods({
  'songs.insert'(obj) {
    check(obj, Object);
    /* other validations here? */
    
    Songs.insert({
      song: obj.song,
      origin: obj.origin,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    });
  }
});