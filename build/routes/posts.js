"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const posts_model_1 = require("../models/posts.model");
const postsModel = new posts_model_1.PostsModel();
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postsList = yield postsModel.listPosts();
        res.render('posts', { title: 'Administrar Posts', posts: postsList });
    });
});
router.get('/search', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const search = req.query.keyword;
        if (!search) {
            return res
                .status(400)
                .json({ error: 'Query parameter "keyword" is required.' });
        }
        const postsList = yield postsModel.searchPosts(search);
        res.render('postsList', { title: 'Procurar Posts', posts: postsList });
    });
});
router.get('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const post = yield postsModel.getPost(id);
        res.render('postDetail', { title: 'Detalhes do Post', currentPost: post });
    });
});
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, content, teacherId } = req.body;
        const post = yield postsModel.createPost(title, content, teacherId);
        console.log(post);
        res.redirect('/posts');
    });
});
router.put('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const { title, content, teacherId } = req.body;
        const post = yield postsModel.getPost(id);
        if (!post)
            return res.status(404).send({ error: 'Post not found.' });
        if (title)
            post.title = title;
        if (content)
            post.content = content;
        if (teacherId)
            post.teacherid = teacherId;
        const result = yield postsModel.editPost(post.id, post.title, post.content, post.teacherid);
        console.log('result: ' + result);
        res.redirect('/posts');
        // return res.status(200).json(result);
    });
});
router.delete('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const post = yield postsModel.getPost(id);
        if (!post)
            return res.status(404).send({ error: 'Post not found.' });
        const result = yield postsModel.deletePost(post.id);
        console.log('result: ' + result);
        res.redirect('/posts');
        // return res.status(200).json(result);
    });
});
module.exports = router;
