import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch(() => console.error());

app.listen(env.PORT, () => {
  console.log(`Server running!`);
});
