const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

const loadToDosCollection = require('../../../config/Keys')

router.get('/', async (req, res) => {
    const todos = await loadToDosCollection();
    res.send(await todos.find({}).toArray());
});

router.post('/', async (req, res) => {
    const todos = await loadToDosCollection();
    await todos.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    const todos = await loadToDosCollection();
    await todos.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
});

module.exports = router;