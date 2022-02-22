const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');

router.get('/', async (req, res) => {
    Comment.find(function (err, result) {
        if (err) return res.send(err)
        else return res.send(result)
    })
});


router.post('/', async (req, res) => {
    const newComment = new Comment({
        text: req.body.text,
        userId: req.body.userId,
        date:req.body.date
    })
    newComment.save(function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.put('/:id', async (req, res) => {
   Comment.replaceOne({ _id: req.params.id }, {
    text: req.body.text,
    userId: req.body.userId,
    date:req.body.date
    }, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    Comment.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
});

router.patch('/:id', async (req, res) => {
    Comment.updateOne({ _id: req.params.id }, req.body, function (err, result) {
        if (err) res.send(err)
        else res.send(result)
    })
})

module.exports = router;