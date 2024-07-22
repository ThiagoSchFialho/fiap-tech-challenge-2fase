import { Posts } from "../entities/posts.entity";
import { IPostsModel } from "./interfaces/posts.model.interface";
import { QueryResult } from 'pg';
const pool = require('../config/db.config')

export class PostsModel implements IPostsModel {

  public async listPosts(): Promise<Posts[]> {
    const client = await pool.connect();
    let result: QueryResult<Posts>;

    try {
      result = await client.query(`
        SELECT 
          posts.id,
          posts.title,
          posts.content,
          TO_CHAR(posts.createdDate, 'DD/MM/YYYY HH24:MI') AS createdDate,
          teacher.name AS teacherName
        FROM 
            posts
        JOIN 
            teacher ON posts.teacherId = teacher.id;
        `);

    } catch (error) {
      console.error('Erro ao selecionar posts', error);
      return [];

    } finally {
      client.release();
    }
  
    return result.rows;
  }

  public async getPost(id: number): Promise<Posts> {
    const client = await pool.connect();
    let result: QueryResult<Posts>;

    try {
      result = await client.query(`
        SELECT 
          posts.id,
          posts.title,
          posts.content,
          TO_CHAR(posts.createdDate, 'DD/MM/YYYY HH24:MI') AS createdDate,
          teacher.name AS teacherName,
          teacher.id AS teacherId
        FROM 
            posts
        JOIN 
            teacher ON posts.teacherId = teacher.id
        WHERE
          posts.id = $1;`,
        [id]
        );

    } catch (error) {
      console.error('Erro ao selecionar post', error);
      throw error;

    } finally {
      client.release();
    }
  
    return result.rows[0];
  }

  public async createPost(title: string, content: string, teacherId: number): Promise<Posts> {
    const client = await pool.connect();
    let result: QueryResult<Posts>;

    try {
      result = await client.query(`
        INSERT INTO posts (title, content, teacherId) VALUES
        ($1, $2, $3)`,
        [title, content, teacherId]
      );
    } catch (error) {
      console.error('Erro ao criar post', error);
      throw error;

    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async editPost(id:number, title: string, content: string, teacherId: number): Promise<Posts> {
    const client = await pool.connect();
    let result: QueryResult<Posts>;

    try {
      result = await client.query(`
        UPDATE posts 
        SET title = $1, content = $2, teacherId = $3 
        WHERE
        posts.id = $4
        RETURNING *;`,
        [title, content, teacherId,id]
      );
    } catch (error) {
      console.error('Erro ao editar post', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async listPostsAdmin(): Promise<Posts[]> {
    throw new Error("Method not implemented.");
  }

  public async deletePost(id: number): Promise<Posts> {
    const client = await pool.connect();
    let result: QueryResult<Posts>;

    try {
      result = await client.query(`
        DELETE
        FROM posts
        WHERE
        posts.id = $1
        RETURNING *;`,
        [id]
      );
    } catch (error) {
      console.error('Erro ao deletar post', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async searchPosts(search: string): Promise<Posts[]> {
    const client = await pool.connect();
    let result: QueryResult<Posts>;
    try {
      result = await client.query(`
        SELECT 
          posts.id,
          posts.title,
          posts.content,
          TO_CHAR(posts.createdDate, 'DD/MM/YYYY HH24:MI') AS createdDate,
          teacher.name AS teacherName
        FROM 
          posts
        JOIN 
          teacher ON posts.teacherId = teacher.id
        WHERE
          posts.title ILIKE $1
          OR
          posts.content ILIKE $1;
        `,[`%${search}%`]);
    } catch (error) {
      console.error('Erro ao procurar posts utilizando palavra-chave', error);
      return []
    }finally{
      client.release();
    }
    return result.rows;
  }
  
}