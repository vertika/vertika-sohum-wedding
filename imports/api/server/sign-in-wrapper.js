import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'loginGuest'(password, callback) {
    if(password == 'timetocelebrate'){
        return 'three';
    }
    else if(password == 'goblue'){
        return 'two';
    }
    else if(password == 'wolverines'){
        return 'one';
    }
    else {
        throw new Meteor.Error(404, "Wrong password");
    }
  }
});

