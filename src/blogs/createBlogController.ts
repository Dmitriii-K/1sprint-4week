import { Request, Response } from "express";
import {
  BlogInputModel,
  BlogViewModel,
  BlogDbType,
} from "../input-output-types/blogs-type";
import { blogCollection } from "../db/mongo-db";

export const createBlogController = async (
  req: Request<any, any, BlogInputModel>,
  res: Response<any>
) => {
  const createDate = new Date().toISOString();
  const newBlog = {
    // id: Date.now().toString(),
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
    createdAt: createDate,
    isMembership: false,
  };
  const nb = await blogCollection.insertOne(newBlog)!;
  if (nb) {
    const x = {
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
      createdAt: createDate,
      isMembership: false,
      id: nb.insertedId,
    };

    res.status(201).json(x);
  } else {
    res.sendStatus(500);
  }
};
