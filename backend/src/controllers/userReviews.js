import UserReviewModel from "../models/UserReviews.js";

export const addUserReviews = async (req, res) => {
  try {
    const newReview = new UserReviewModel({
      rating: req.body.rating,
      review: req.body.review,
      rawgId: req.body.rawgId,
      userId: req.body.Id,
    });
    await newReview.save();
    res.json({ status: "ok", msg: "adding successful" });
  } catch (error) {
    res.status(400).send("an error has occured");
  }
};
