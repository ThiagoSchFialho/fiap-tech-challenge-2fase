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
const express = require('express');
const router = express.Router();
const teacher_model_1 = require("../models/teacher.model");
const teacherModel = new teacher_model_1.TeacherModel();
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacherList = yield teacherModel.listTeachers();
        res.render('teachers', { title: 'Professores', teachers: teacherList });
    });
});
router.get('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const teacher = yield teacherModel.getTeacher(id);
        res.render('teacherForm', { title: 'Professores', teacher: teacher });
    });
});
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        const teacher = yield teacherModel.createTeacher(name);
        console.log(teacher);
        res.redirect('/teachers');
    });
});
router.put('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const teacher = yield teacherModel.getTeacher(id);
        console.log('teacher: ' + teacher);
        if (!teacher)
            return res.status(404).send({ error: 'Professor not found.' });
        if (name)
            teacher.name = name;
        const result = yield teacherModel.editTeacher(teacher.id, teacher.name);
        console.log('result: ' + result);
        res.redirect('/teachers');
        // return res.status(200).json(result);
    });
});
router.delete('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const teacher = yield teacherModel.getTeacher(id);
        if (!teacher)
            return res.status(404).send({ error: 'Teacher not found.' });
        const result = yield teacherModel.deleteTeacher(teacher.id);
        console.log('result: ' + result);
        res.redirect('/teachers');
        // return res.status(200).json(result);
    });
});
module.exports = router;
