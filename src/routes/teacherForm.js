const express = require('express');
const router = express.Router();
import { TeacherModel } from '../models/teacher.model';
const teacherModel = new TeacherModel();

router.get('/', function(req, res) {
  res.render('teacherForm', { title: 'Criar Professor', isEdit: false, teacher: null, formAction: '/teachers' });
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;

  const teacher = await teacherModel.getTeacher(id);
  const formAction = `/teachers/${id}?_method=PUT`
  res.render('teacherForm', { title: 'Editar Professor', isEdit: true, teacher: teacher, formAction: formAction });
});

module.exports = router;
