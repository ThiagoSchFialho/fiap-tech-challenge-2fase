const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('teacherForm', { title: 'Criar Professor' });
});

module.exports = router;
