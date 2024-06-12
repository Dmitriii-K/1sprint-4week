import { Request, Response } from "express";
import { PostViewModel, PostDbType, PaginatorPostViewModel } from "../input-output-types/posts-type";
import { SortDirection } from "../input-output-types/enyType";
import { postCollection } from "../db/mongo-db";
import { WithId } from "mongodb";
import { postsMap } from "../posts/getPostsController";

export const getPostForBlogController = async (
  req: Request,
  res: Response<PostViewModel[]>
) => {
  try {
    const posts: WithId<PostDbType>[] = await postCollection
      .find({ blogId: req.params.id })
      .toArray();
    const postForBlog = posts.map(postsMap);
    res.status(200).json(postForBlog);
  } catch (error) {
    console.error(error);
  }
};


{
  pageNumber: query.pageNumber ? +query.pageNumber : 1,
  pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
  sortBy: query.sortBy ? query.sortBy : 'createdAt',
  sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
}