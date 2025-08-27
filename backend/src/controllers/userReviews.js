import UserReviewModel from "../models/UserReviews.js";

export const addUserReviews = async (req, res) => {
  try {
    const newReview = new UserReviewModel({
      rating: req.body.rating,
      review: req.body.review,
      rawgId: req.body.rawgId,
      gameName: req.body.gameName,
      userId: req.body.userId,
    });
    await newReview.save();
    res.json({ status: "ok", msg: "Review added successfully" });
  } catch (error) {
    res.status(400).send("an error has occured when adding review");
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const allReviews = await UserReviewModel.find().populate("userId");
    res.json(allReviews);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("an error has occured when getting all reviews");
  }
};

export const getOneUserReviews = async (req, res) => {
  try {
    const oneUserReviews = await UserReviewModel.find({
      userId: req.body.userId,
    }).populate("userId");
    return res.json(oneUserReviews);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("an error has occured when getting one user reviews");
  }
};

export const getOneGameReviews = async (req, res) => {
  try {
    const oneGameReviews = await UserReviewModel.find({
      rawgId: req.body.rawgId,
    }).populate("userId");
    return res.json(oneGameReviews);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("an error has occured when getting one game reviews");
  }
};

export const deleteOneGameReviewByReviewId = async (req, res) => {
  try {
    const deleteOneGameReview = await UserReviewModel.deleteOne({
      _id: req.body.reviewId, // this is looking at reviewId or {reviewId: reviewId}?
      userId: req.body.userId,
    });
    console.log(deleteOneGameReview);
    res.json({ status: "ok", msg: "Review delete successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send("an error has occured when deleting one game reviews by userId");
  }
};
