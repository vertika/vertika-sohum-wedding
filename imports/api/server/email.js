import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


Meteor.methods({
  sendEmail: function (toName, toEmail, from, subject) {
    //check([toEmail, from, subject, html], [String]);

    SSR.compileTemplate( 'htmlEmail', Assets.getText( 'rsvpConfirmation.html' ) );

    var emailData = {
      name: toName,
      subject: subject
    };

    Email.send({
      to: toEmail,
      from: from,
      subject: subject,
      html: SSR.render( 'htmlEmail', emailData )
    });

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();
  }
});