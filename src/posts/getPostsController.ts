import { Request, Response } from "express";
import {
  PostDbType,
  PostViewModel,
  PaginatorPostViewModel,
} from "../input-output-types/posts-type";
import { SortDirection } from "../input-output-types/enyType";
import { postCollection } from "../db/mongo-db";
import { WithId } from "mongodb";

export const postsMap = (post: WithId<PostDbType>): PostViewModel => {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};

export const getPostsController = async (
  req: Request,
  res: Response<PostViewModel[]>
) => {
  const posts: WithId<PostDbType>[] = await postCollection.find({}).toArray();
  const outputPosts = posts.map(postsMap);
  res.status(200).json(outputPosts);
};

const halper = (query: { [key: string]: string | undefined }) => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection
      ? (query.sortDirection as SortDirection)
      : "desc",
  };
};
