import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "backendapi",
    })
    .then(() => {
      console.log("connection established");
    })
    .catch(() => {
      console.log("connection failed");
    });
};
