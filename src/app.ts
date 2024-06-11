import express from "express";
import cors from "cors";
import { SETTINGS } from "./settings";
import { deleteRouter } from "./deleteAllData";
import { blogRouter } from "./blogs/blogRouters";
import { postRouter } from "./posts/postsRouters";
import { connectDB } from "./db/mongo-db";

export const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("WORKING");
});

export const start = async () => {
  if (!(await connectDB())) {
    console.log("NOT CONNECT TO DB");
    process.exit(1);
  }
  app.listen(SETTINGS.PORT, () => {
    console.log("...server started in port " + SETTINGS.PORT);
  });
};

app.use(SETTINGS.PATH.BLOGS, blogRouter);
app.use(SETTINGS.PATH.POSTS, postRouter);
app.use(SETTINGS.PATH.TESTING, deleteRouter);
