const Feedback = require("../models/feedback");
const to = require("./to");

module.exports = {
  handleNewFeedback: async function(feedback) {
    let err, newFeedback, updatedFeedback;

    if (feedback.uid !== null) {
      [err, updatedFeedback] = await to(
        Feedback.findOneAndUpdate(
          { type: feedback.type, uid: feedback.uid },
          { value: feedback.value },
          { new: true }
        )
      );
    }

    if (updatedFeedback) {
      return updatedFeedback;
    }

    [err, newFeedback] = await to(Feedback.create(feedback));

    if (err) {
      return err;
    }

    return newFeedback;
  },

  getFeedbackByUser: async function(uid) {
    let err, arrayOfFeedback;
    [err, arrayOfFeedback] = await to(Feedback.find({ uid: uid }));
    return arrayOfFeedback;
  }
};
