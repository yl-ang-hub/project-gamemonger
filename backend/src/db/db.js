import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
