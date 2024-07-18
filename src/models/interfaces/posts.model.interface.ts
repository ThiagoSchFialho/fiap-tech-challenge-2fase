import { Posts } from "../../entities/posts.entity";

export interface IPostsModel {
  listPosts(): Promise<Posts[]>
  getPost(id: number): Promise<Posts>
  createPost(): Promise<Posts>
  editPost(id: number): Promise<Posts>
  listPostsAdmin(): Promise<Posts[]>
  deletePost(id: number): Promise<Posts>
  searchPosts(search: string): Promise<Posts[]>
}