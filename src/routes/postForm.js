const express = require('express');
const router = express.Router();

import { PostsModel } from '../models/posts.model';
const postsModel = new PostsModel();

router.get('/', function(req, res) {
  res.render('postForm', { title: 'Criar Post', isEdit: false, post: null, formAction: '/posts' });
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;

  const post = await postsModel.getPost(id);
  const formAction = `/posts/${id}?_method=PUT`
  res.render('postForm', { title: 'Editar Post', isEdit: true, post: post, formAction: formAction });
});

module.exports = router;
