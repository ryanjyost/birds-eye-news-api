const User = require("../models/user");
const to = require("./to");

module.exports = async function(user, subscribedToMailchimp) {
  console.log("CREATE USER!!!!");
  let err, newUser, existingUser;

  [err, existingUser] = await to(
    User.findOne({ "firebase.uid": user.user.uid })
  );

  if (existingUser) {
    return existingUser;
  }

  [err, newUser] = await to(
    User.create({
      firebase: user.user,
      mailchimp: subscribedToMailchimp
    })
  );

  if (err) {
    return err;
  }

  return newUser;
};
