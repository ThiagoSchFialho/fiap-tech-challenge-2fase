const express = require('express');
const router = express.Router();
import { TeacherModel } from '../models/teacher.model';
const teacherModel = new TeacherModel();

router.get('/', async function(req, res) {
  const teacherList = await teacherModel.listTeachers();
  res.render('teachers', { title: 'Professores', teachers: teacherList });
});

router.get('/:id', async function(req, res) {
  const id = parseInt(req.params.id);
  const teacher = await teacherModel.getTeacher(id);
  
  res.render('teacherForm', { title: 'Professores', teacher: teacher });
});

router.post('/', async function (req, res) {
  const { name } = req.body;

  const teacher = await teacherModel.createTeacher(name);
  console.log(teacher);

  res.redirect('/teachers');
});

router.put('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const teacher = await teacherModel.getTeacher(id);
  console.log('teacher: ' + teacher);

  if (!teacher) return res.status(404).send({ error: 'Professor not found.' });

  if (name) teacher.name = name;

  const result = await teacherModel.editTeacher(
    teacher.id,
    teacher.name
  );
  console.log('result: ' + result);

  res.redirect('/teachers');
  // return res.status(200).json(result);
});

router.delete('/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  const teacher = await teacherModel.getTeacher(id);

  if (!teacher) return res.status(404).send({ error: 'Teacher not found.' });

  const result = await teacherModel.deleteTeacher(teacher.id);
  console.log('result: ' + result);
  res.redirect('/teachers');

  // return res.status(200).json(result);
});

module.exports = router;
