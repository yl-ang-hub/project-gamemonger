import mongoose from "mongoose";

// TODO: Need to update MONGODB_URI to the correct database
// currently set to acme
const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
