import mongoose from "mongoose";

// TODO: Need to update MONGODB_URI to the correct database
// currently set to acme
const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
