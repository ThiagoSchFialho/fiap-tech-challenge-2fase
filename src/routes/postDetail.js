const express = require('express');
const router = express.Router();
const currentPost = {
  title: 'Dificuldade de aprender uma nova língua',
  author: 'Sérgio Neto',
  content: 'Aprender uma nova língua é um desafio recompensador. A prática constante e a exposição a diferentes contextos são essenciais para o domínio. Seja por meio de leituras, conversações ou imersão cultural, cada passo contribui significativamente para a fluência. Perseverança e motivação são chaves para o sucesso.',
  createdDate: '18/07/2024'
};

router.get('/', function(req, res) {
  res.render('postDetail', { title: 'Detalhes do Post', currentPost: currentPost });
});

module.exports = router;
