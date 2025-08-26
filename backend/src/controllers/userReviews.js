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

// export const deleteOneGameReviewByReviewId = async (req, res) => {
//   try {
//     const deleteOneGameReview = await UserReviewModel.findByIdAndDelete(
//       req.body.reviewId,
//       req.body.userId
//     );
//     res.json({ status: "ok", msg: "Review delete successfully" });
//   } catch (error) {
//     console.error(error.message);
//     res
//       .status(400)
//       .send("an error has occured when deleting one game reviews by userId");
//   }
// };

export const deleteOneGameReviewByReviewId = async (req, res) => {
  try {
    const deleteOneGameReview = await UserReviewModel.findOneAndDelete(
      req.body.reviewId,
      req.body.userId
    );
    res.json({ status: "ok", msg: "Review delete successfully" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .send("an error has occured when deleting one game reviews by userId");
  }
};

// export const deleteOneGameReviewByReviewId = async (req, res) => {
//   if (req.decoded.id === req.body.userId) {
//     try {
//       const deleteOneGameReview = await UserReviewModel.findByIdAndDelete(
//         req.body.reviewId
//       );
//       res.json({ status: "ok", msg: "Review delete successfully" });
//     } catch (error) {
//       console.error(error.message);
//       res
//         .status(400)
//         .send("an error has occured when deleting one game reviews by userId");
//     }
//   }
// };

// { //login by 68a5b57a096821ed58028e84, authCtx.userId= 68a5b57a096821ed58028e84, req.decodedid = 68a5b57a096821ed58028e84
//       "_id": "68adc8cad750478911bb105a", //reviewId
//       "rating": 5,
//       "review": "try again",
//       "rawgId": "3498",
//       "gameName": "Grand Theft Auto V",
//       "userId": {
//           "_id": "68a5b57a096821ed58028e84", //userId this is reflecting as an object? or as an id? This is referencing.
//           "username": "Shrek",
//           "hash": "$2b$12$0PME6xsBUY88pIPl9grvB.rPmbc/Z1kgQuD679hXzLUS47mHzJT/i",
//           "picture": "src/assets/images/userImg.jpg",
//           "created_at": "2025-08-25T05:27:12.841Z",
//           "__v": 0
//       },
//       "__v": 0
//   },
