import { Request, Response } from "express";
import {
  BlogViewModel,
  BlogDbType,
  PaginatorBlogViewModel,
} from "../input-output-types/blogs-type";
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
  req: Request<PaginatorBlogViewModel>,
  res: Response<BlogViewModel[]>
) => {
  const search = query.searchNameTerm
    ? { title: { $regex: query.searchNameTerm, $options: "i" } }
    : {};
  try {
    const blogs: WithId<BlogDbType>[] = (await blogCollection
      .find({})
      .sort(query.sortBy, query.sortDirection)
      .skip((query.pageNumber - 1) * query.pageSize)
      .limit(query.pageSize)
      .toArray()) as any[];
    const totalCount = await blogCollection.countDocuments({});
    return {
      pagesCount: Math.ceil(totalCount / query.pageSize),
      page: query.pageNumber,
      pageSize: query.pageSize,
      totalCount,
      items: items.map(this.mapToOutput),
    };
    const outputBlogs = blogs.map(blogsMap);
    res.status(200).json(outputBlogs);
  } catch (e) {
    console.log(e);
    return { error: "some error" };
  }
};

const halper = (query: { [key: string]: string | undefined }) => {
  return {
    pageNumber: query.pageNumber ? +query.pageNumber : 1,
    pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    sortBy: query.sortBy ? query.sortBy : "createdAt",
    sortDirection: query.sortDirection
      ? (query.sortDirection as SortDirection)
      : "desc",
    searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
  };
};
