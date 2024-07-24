var express = require('express');
var router = express.Router();

import { PostsModel } from '../models/posts.model';
const postsModel = new PostsModel();

router.get('/', async function (req, res) {
  const postsList = await postsModel.listPosts();

  res.render('posts', { title: 'Administrar Posts', posts: postsList });
});

router.get('/search', async function (req, res) {
  const search = req.query.keyword;
  if (!search) {
    return res
      .status(400)
      .json({ error: 'Query parameter "keyword" is required.' });
  }
  const postsList = await postsModel.searchPosts(search);

  res.render('postsList', { title: 'Procurar Posts', posts: postsList });
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;

  const post = await postsModel.getPost(id);

  res.render('postDetail', { title: 'Detalhes do Post', currentPost: post });
});

router.post('/', async function (req, res) {
  const { title, content, teacherId } = req.body;

  const post = await postsModel.createPost(title, content, teacherId);
  console.log(post);

  res.redirect('/posts');
});

router.put('/:id', async function (req, res) {
  const id = parseInt(req.params.id);
  const { title, content, teacherId } = req.body;

  const post = await postsModel.getPost(id);

  if (!post) return res.status(404).send({ error: 'Post not found.' });

  if (title) post.title = title;
  if (content) post.content = content;
  if (teacherId) post.teacherid = teacherId;

  const result = await postsModel.editPost(
    post.id,
    post.title,
    post.content,
    post.teacherid,
  );
  console.log('result: ' + result);

  res.redirect('/posts');
  // return res.status(200).json(result);
});

router.delete('/:id', async function (req, res) {
  const id = parseInt(req.params.id);

  const post = await postsModel.getPost(id);

  if (!post) return res.status(404).send({ error: 'Post not found.' });

  const result = await postsModel.deletePost(post.id);
  console.log('result: ' + result);
  res.redirect('/posts');

  // return res.status(200).json(result);
});

module.exports = router;
