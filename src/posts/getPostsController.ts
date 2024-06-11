import { Request, Response } from "express";
import { PostDbType, PostViewModel } from "../input-output-types/posts-type";
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
