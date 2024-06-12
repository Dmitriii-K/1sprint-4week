import { Request, Response } from "express";
import { BlogViewModel, BlogDbType, PaginatorBlogViewModel } from "../input-output-types/blogs-type";
import { SortDirection } from "../input-output-types/enyType";
import { blogCollection } from "../db/mongo-db";
import { WithId } from "mongodb";

export const blogsMap = (blog: WithId<BlogDbType>): BlogViewModel => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
};

export const getBlogsController = async (
  req: Request,
  res: Response<BlogViewModel[]>
) => {
  const blogs: WithId<BlogDbType>[] = await blogCollection.find({}).toArray();
  const outputBlogs = blogs.map(blogsMap);
  res.status(200).json(outputBlogs);
};


{
  pageNumber: query.pageNumber ? +query.pageNumber : 1,
  pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
  sortBy: query.sortBy ? query.sortBy : 'createdAt',
  sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
  searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
}