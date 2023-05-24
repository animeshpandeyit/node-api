import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();
console.log(process.env.MONGO_URI);
app.listen(5000, () => {
  console.log(
    `Server listening on ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
// console.log(process.env.PORT);

// app.listen(process.env.PORT, () => {
//   console.log("Server is Running...5000");
// });
