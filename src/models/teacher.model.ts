import { Teacher } from "../entities/teacher.entity";
import { ITeacherModel } from "./interfaces/teacher.model.interface";
import { QueryResult } from 'pg';
const pool = require('../config/db.config')

export class TeacherModel implements ITeacherModel {

  public async listTeachers(): Promise<Teacher[]> {
    const client = await pool.connect();
    let result: QueryResult<Teacher>;

    try {
      result = await client.query(`
        SELECT 
          teacher.id,
          teacher.name
        FROM 
          teacher
        `);

    } catch (error) {
      console.error('Erro ao selecionar professores', error);
      return [];

    } finally {
      client.release();
    }
  
    return result.rows;
  }

  public async getTeacher(id: number): Promise<Teacher> {
    const client = await pool.connect();
    let result: QueryResult<Teacher>;

    try {
      result = await client.query(`
        SELECT 
          teacher.id,
          teacher.name
        FROM 
            teacher
        WHERE
          teacher.id = $1;`,
        [id]
        );

    } catch (error) {
      console.error('Erro ao selecionar professor', error);
      throw error;

    } finally {
      client.release();
    }
  
    return result.rows[0];
  }

  public async createTeacher(name: string): Promise<Teacher> {
    const client = await pool.connect();
    let result: QueryResult<Teacher>;

    try {
      result = await client.query(`
        INSERT INTO teacher (name) VALUES
        ($1)`,
        [name]
      );
    } catch (error) {
      console.error('Erro ao criar professor', error);
      throw error;

    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async editTeacher(id:number, name: string): Promise<Teacher> {
    const client = await pool.connect();
    let result: QueryResult<Teacher>;

    try {
      result = await client.query(`
        UPDATE teacher 
        SET name = $1
        WHERE
        teacher.id = $2
        RETURNING *;`,
        [name,id]
      );
    } catch (error) {
      console.error('Erro ao editar professor', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async listTeachersAdmin(): Promise<Teacher[]> {
    throw new Error("Method not implemented.");
  }

  public async deleteTeacher(id: number): Promise<Teacher> {
    const client = await pool.connect();
    let result: QueryResult<Teacher>;

    try {
      result = await client.query(`
        DELETE
        FROM teacher
        WHERE
        teacher.id = $1
        RETURNING *;`,
        [id]
      );
    } catch (error) {
      console.error('Erro ao deletar professor', error);
      throw error;
    } finally {
      client.release();
    }

    return result.rows[0];
  }

  public async searchTeachers(search: string): Promise<Teacher[]> {
    const client = await pool.connect();
    let result: QueryResult<Teacher>;
    try {
      result = await client.query(`
        SELECT 
          teacher.id,
          teacher.name
        FROM 
          teacher
        WHERE
          teacher.name ILIKE $1
        `,[`%${search}%`]);
    } catch (error) {
      console.error('Erro ao procurar professores utilizando palavra-chave', error);
      return []
    } finally {
      client.release();
    }
    return result.rows;
  }
  
}