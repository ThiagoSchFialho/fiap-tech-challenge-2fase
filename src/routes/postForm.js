const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  // Mandar variável dizendo se é criação/edição
  res.render('postForm', { title: 'Criar Post' });
});

module.exports = router;
