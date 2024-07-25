var express = require('express');
var router = express.Router();

import { PostsModel } from '../models/posts.model';
const postsModel = new PostsModel();

/**
 * @swagger
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - teacherId
 *       properties:
 *         id:
 *           type: number
 *           description: ID do posts
 *         title:
 *           type: string
 *           description: Título do post
 *         content:
 *           type: string
 *           description: Conteúdo do post
 *         techerId:
 *           type: string
 *           description: ID do professor
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retorna a lista de todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 */

router.get('/', async function (req, res) {
  const postsList = await postsModel.listPosts();

  res.render('posts', { title: 'Administrar Posts', posts: postsList });
});

/**
 * @swagger
 * /posts/admin:
 *   get:
 *     summary: Retorna a lista de todos os posts com a visão administrativa
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 */

router.get('/admin', async function (req, res) {
  const postsList = await postsModel.listPosts();

  res.render('posts', { title: 'Administrar Posts', posts: postsList });
});

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Busca posts por palavra-chave
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Palavra-chave para buscar posts
 *     responses:
 *       200:
 *         description: Lista de posts correspondentes à palavra-chave
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Posts'
 *       400:
 *         description: Parâmetro de consulta "keyword" é obrigatório
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Post não encontrado
 */

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

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna o post pelo ID especificado
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post especificado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Posts'
 *       400:
 *          description: Post não encontrado
 */

router.get('/:id', async function (req, res) {
  const id = req.params.id;

  const post = await postsModel.getPost(id);

  res.render('postDetail', { title: 'Detalhes do Post', currentPost: post });
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posts'
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Requisição inválida
 */

router.post('/', async function (req, res) {
  const { title, content, teacherId } = req.body;

  const post = await postsModel.createPost(title, content, teacherId);
  console.log(post);

  res.redirect('/posts');
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Posts'
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 *       400:
 *         description: Requisição inválida
 */

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

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta o post pelo ID especificado
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       204:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 */

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
