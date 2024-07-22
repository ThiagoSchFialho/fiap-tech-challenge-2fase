const express = require('express');
const router = express.Router();
const teachers = [
  { name: 'Felipe Dias' },
  { name: 'Leonardo Boatti' },
  { name: 'Sérgio Neto' },
  { name: 'Thiago Fialho' }
]

router.get('/', function(req, res) {
  res.render('teachers', { title: 'Professores', teachers: teachers });
});

module.exports = router;
