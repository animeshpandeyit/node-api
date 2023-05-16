import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();
console.log(process.env.MONGO_URI);
app.listen(5000, () => {
  console.log("Server is Running...5000");
});
// console.log(process.env.PORT);

// app.listen(process.env.PORT, () => {
//   console.log("Server is Running...5000");
// });
