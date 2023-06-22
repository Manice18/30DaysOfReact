import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import {userRouter} from "./routes/users.js"
import {recipesRouter} from "./routes/recipes.js"

dotenv.config();

const app = express()

app.use(express.json());
app.use(cors());

app.use("/auth",userRouter);
app.use("/recipes",recipesRouter);
mongoose.connect(process.env.MONGO_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.listen(3002, ()=>console.log("Server started on port 3001"));