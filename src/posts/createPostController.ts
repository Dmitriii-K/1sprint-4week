import { Request, Response } from "express";
import { PostInputModel, PostDbType } from "../input-output-types/posts-type";
import { postCollection, blogCollection } from "../db/mongo-db";
import { ObjectId } from "mongodb";

const createDate = new Date().toISOString();

export const createPostController = async (
  req: Request<any, any, PostInputModel>,
  res: Response<any>
) => {
  const id = new ObjectId(req.body.blogId);
  const bi = await blogCollection.findOne({ _id: id });

  const newPost: PostDbType = {
    // id: Date.now().toString(),
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: bi!.name,
    createdAt: createDate,
  };
  const cp = await postCollection.insertOne(newPost);
  if (cp) {
    const z = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
      blogName: bi!.name,
      createdAt: createDate,
      id: cp.insertedId,
    };
    res.status(201).json(z);
  } else {
    return;
  }
};
