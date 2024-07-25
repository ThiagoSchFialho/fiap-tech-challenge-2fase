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
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postsModel = new posts_model_1.PostsModel();
        const postsList = yield postsModel.listPosts();
        res.render('posts', { title: 'Administrar Posts', posts: postsList });
    });
});
router.get('/', function (req, res) {
    res.render('postForm', { title: 'Criar Post' });
});
router.get('/', function (req, res) {
    res.render('teachers', { title: 'Professores' });
});
module.exports = router;
