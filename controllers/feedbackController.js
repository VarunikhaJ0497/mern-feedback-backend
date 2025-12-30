const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
  const feedback = await Feedback.create({
    studentId: req.user.id,
    course: req.body.course,
    rating: req.body.rating,
    comment: req.body.comment
  });
  res.json(feedback);
};

exports.getAllFeedback = async (req, res) => {
  const feedback = await Feedback.find().populate("studentId", "name");
  res.json(feedback);
};
