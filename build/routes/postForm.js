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
const express = require('express');
const router = express.Router();
const posts_model_1 = require("../models/posts.model");
const postsModel = new posts_model_1.PostsModel();
router.get('/', function (req, res) {
    res.render('postForm', { title: 'Criar Post', isEdit: false, post: null, formAction: '/posts' });
});
router.get('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const post = yield postsModel.getPost(id);
        const formAction = `/posts/${id}?_method=PUT`;
        res.render('postForm', { title: 'Editar Post', isEdit: true, post: post, formAction: formAction });
    });
});
module.exports = router;
