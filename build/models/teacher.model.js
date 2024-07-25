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
exports.TeacherModel = void 0;
const pool = require('../config/db.config');
class TeacherModel {
    listTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        SELECT 
          teacher.id,
          teacher.name
        FROM 
          teacher
        `);
            }
            catch (error) {
                console.error('Erro ao selecionar professores', error);
                return [];
            }
            finally {
                client.release();
            }
            return result.rows;
        });
    }
    getTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        SELECT 
          teacher.id,
          teacher.name
        FROM 
            teacher
        WHERE
          teacher.id = $1;`, [id]);
            }
            catch (error) {
                console.error('Erro ao selecionar professor', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    createTeacher(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        INSERT INTO teacher (name) VALUES
        ($1)`, [name]);
            }
            catch (error) {
                console.error('Erro ao criar professor', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    editTeacher(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        UPDATE teacher 
        SET name = $1
        WHERE
        teacher.id = $2
        RETURNING *;`, [name, id]);
            }
            catch (error) {
                console.error('Erro ao editar professor', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    listTeachersAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    deleteTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        DELETE
        FROM teacher
        WHERE
        teacher.id = $1
        RETURNING *;`, [id]);
            }
            catch (error) {
                console.error('Erro ao deletar professor', error);
                throw error;
            }
            finally {
                client.release();
            }
            return result.rows[0];
        });
    }
    searchTeachers(search) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield pool.connect();
            let result;
            try {
                result = yield client.query(`
        SELECT 
          teacher.id,
          teacher.name
        FROM 
          teacher
        WHERE
          teacher.name ILIKE $1
        `, [`%${search}%`]);
            }
            catch (error) {
                console.error('Erro ao procurar professores utilizando palavra-chave', error);
                return [];
            }
            finally {
                client.release();
            }
            return result.rows;
        });
    }
}
exports.TeacherModel = TeacherModel;
