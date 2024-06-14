import { Request, Response } from "express";
import {
  PostViewModel,
  PostDbType,
  PaginatorPostViewModel,
} from "../input-output-types/posts-type";
import { BlgId } from "../input-output-types/eny-type";
import { TypePostForBlogHalper } from "../input-output-types/blogs-type";
import { postCollection } from "../db/mongo-db";
import { WithId } from "mongodb";
import { ObjectId } from "mongodb";
import { postsMap } from "../posts/getPostsController";
import { halper } from "../middlewares/middlewareForAll";

export const getPostForBlogController = async (
  req: Request<BlgId, any, any, TypePostForBlogHalper>,
  res: Response<PaginatorPostViewModel>
) => {
  const id = new ObjectId(req.params.id);

  const byId = id ? { id: new ObjectId(id) } : {};

  const queryParams = halper(req.query);
  try {
    const items: WithId<PostDbType>[] = (await postCollection
      .find({ byId })
      .sort(queryParams.sortBy, queryParams.sortDirection)
      .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
      .limit(queryParams.pageSize)
      .toArray()) as any[];
    const totalCount = await postCollection.countDocuments(byId);
    const newPost = {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount,
      items: items.map(postsMap),
    };
    // const postForBlog = posts.map(postsMap);
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
  }
};
