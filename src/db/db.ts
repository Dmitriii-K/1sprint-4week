export type DBBlogType = {
  blogs: any[];
};

export const dbBlog: DBBlogType = {
  blogs: [],
};

export type DBPostType = {
  posts: any[];
};

export const dbPost: DBPostType = {
  posts: [],
};

export const setDB = (dataset?: Partial<DBPostType & DBBlogType>) => {
  if (!dataset) {
    // если в функцию ничего не передано - то очищаем базу данных
    dbPost.posts = [];
    dbBlog.blogs = [];
    return;
  }

  // если что-то передано - то заменяем старые значения новыми
  dbPost.posts = dataset.posts || dbPost.posts;
  dbBlog.blogs = dataset.blogs || dbBlog.blogs;
  // db.some = dataset.some || db.some
};
