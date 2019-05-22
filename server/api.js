const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/get', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
    console.log("Get");
});

// Add Post
router.post('/post', async (req, res) => {
    const posts = await loadPostsCollection();
    // create schema for insertion!
    await posts.insertOne({
        dataObject: req.body.dataObject, // insert entire JSON object 
        createdAt: new Date()
    });
    console.log("Posting...");
    res.status(201).send();
});

// Delete Post
router.delete('/delete/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/testDB',
    {
        useNewUrlParser: true
    }
    );

    return client.db('testDB').collection('posts');
}

module.exports = router;
