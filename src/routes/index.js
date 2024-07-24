var express = require('express');
var router = express.Router();

import { PostsModel } from '../models/posts.model';

router.get('/', async function(req, res) {
  const postsModel = new PostsModel();
  const postsList = await postsModel.listPosts();

  res.render('posts', { title: 'Administrar Posts', posts: postsList });
});

router.get('/', function(req, res) {
  res.render('postForm', {title: 'Criar Post' });
});

router.get('/', function(req, res) {
  res.render('teachers', { title: 'Professores' });
});

module.exports = router;
