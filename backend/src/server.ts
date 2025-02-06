import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

import { dbConnect } from "./configs/database.config"
import userRouter from "./routers/user.router";
import courseRouter from "./routers/course.router";
import reviewRouter from "./routers/review.router";

const app = express();

dbConnect();
app.use(express.json())

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));




app.use("/api/users" ,userRouter)
app.use("/api/courses" ,courseRouter)
app.use("/api/review" ,reviewRouter)




const port = 5001;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})