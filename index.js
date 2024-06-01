import express from 'express';
import got from 'got';
import mongoose from'mongoose';
import Post from './Post.js';
import bodyparser from 'body-parser';
import cors from 'cors';

const app = express();

const DB_URL = 'mongodb+srv://user:user@cluster0.ijvxc0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(cors());
app.use(bodyparser.json());

async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(port, () => console.log('listening on port ' + port));
    } catch (e) {
        console.log(e)
    }
}

app.get('/api/user', async (req, res) => {
    try {
        const posts = await Post.find()
        return res.json(posts)
    } catch (e) {
        console.log(e)
    }
})

app.get('/api/:section', async (req, res) => {
    if (! req.query.search) {
        const response = await got(`https://swapi.dev/api/${req.params.section}/`);
        const section = JSON.parse(response.body).results;
        res.json(section);
    } else {
        const response = await got(`https://swapi.dev/api/${req.params.section}/?search=${req.query.search}`);
        const section = JSON.parse(response.body).results;
        res.json(section);
    }
})

app.post('/api/new', async (req, res) => {
    const { section, name, additional_data } = req.body;

    if (!section || !name) {
        return res.status(400).json({ error: 'All fields are required: section, name, and additional_data' });
    }

    try {
        const data = {
            section,
            name,
            additional_data,
        };

        const post = new Post(data);
        await post.save();

        res.status(201).json({ message: 'Created', post });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
    }
})

const port = 8080;

startApp()