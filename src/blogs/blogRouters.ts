import { Router } from "express";
import { getBlogsController } from "./getBlogsController";
import { createBlogController } from "./createBlogController";
import { findBlogController } from "./findBlogController";
import { updateBlogController } from "./updateBlogController";
import { deleteBlogController } from "./deleteBlogController";
import {
  authMiddleware,
  blogInputValidation,
  inputCheckErrorsMiddleware,
} from "../middlewares/middlewareForAll";

export const blogRouter = Router();

blogRouter.get("/", getBlogsController);
blogRouter.post(
  "/",
  authMiddleware,
  blogInputValidation,
  inputCheckErrorsMiddleware,
  createBlogController
);
blogRouter.get("/:id", findBlogController);
blogRouter.put(
  "/:id",
  authMiddleware,
  blogInputValidation,
  inputCheckErrorsMiddleware,
  updateBlogController
);
blogRouter.delete("/:id", authMiddleware, deleteBlogController);
