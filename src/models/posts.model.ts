import { Posts } from "../entities/posts.entity";
import { IPostsModel } from "./interfaces/posts.model.interface";

export class PostsModel implements IPostsModel {
  listPosts(): Promise<Posts[]> {
    throw new Error("Method not implemented.");
  }
  getPost(id: number): Promise<Posts> {
    throw new Error("Method not implemented.");
  }
  createPost(): Promise<Posts> {
    throw new Error("Method not implemented.");
  }
  editPost(id: number): Promise<Posts> {
    throw new Error("Method not implemented.");
  }
  listPostsAdmin(): Promise<Posts[]> {
    throw new Error("Method not implemented.");
  }
  deletePost(id: number): Promise<Posts> {
    throw new Error("Method not implemented.");
  }
  searchPosts(search: string): Promise<Posts[]> {
    throw new Error("Method not implemented.");
  }
  
}