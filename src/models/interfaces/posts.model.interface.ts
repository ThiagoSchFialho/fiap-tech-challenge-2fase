import { Posts } from "../../entities/posts.entity";

export interface IPostsModel {
  listPosts(): Promise<Posts[]>
  getPost(id: number): Promise<Posts>
  createPost(title: string, content: string, teacherId: number): Promise<Posts>
  editPost(id: number, title: string, content: string, teacherId: number): Promise<Posts>
  listPostsAdmin(): Promise<Posts[]>
  deletePost(id: number): Promise<Posts>
  searchPosts(search: string): Promise<Posts[]>
}