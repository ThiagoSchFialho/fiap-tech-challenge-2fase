"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModel = void 0;
const pool = require('../config/db.config');
class PostsModel {
    listPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
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
            }
            catch (error) {
                console.error('Erro ao selecionar posts', error);
                return [];
            }
            finally {
                client.release();
            }
            return result.rows;
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
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
          posts.id = $1;`, [id]);
            }
            catch (error) {
                console.error('Erro ao selecionar post', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    createPost(title, content, teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        INSERT INTO posts (title, content, teacherId) VALUES
        ($1, $2, $3)`, [title, content, teacherId]);
            }
            catch (error) {
                console.error('Erro ao criar post', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    editPost(id, title, content, teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        UPDATE posts 
        SET title = $1, content = $2, teacherId = $3 
        WHERE
        posts.id = $4
        RETURNING *;`, [title, content, teacherId, id]);
            }
            catch (error) {
                console.error('Erro ao editar post', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    listPostsAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        DELETE
        FROM posts
        WHERE
        posts.id = $1
        RETURNING *;`, [id]);
            }
            catch (error) {
                console.error('Erro ao deletar post', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    searchPosts(search) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
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
        `, [`%${search}%`]);
            }
            catch (error) {
                console.error('Erro ao procurar posts utilizando palavra-chave', error);
                return [];
            }
            finally {
                client.release();
            }
            return result.rows;
        });
    }
}
exports.PostsModel = PostsModel;
