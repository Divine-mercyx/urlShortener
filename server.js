import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import urlRoute from "./routes/urlRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.use("/api/v1", userRoute)
app.use("/", urlRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
connectDb()
