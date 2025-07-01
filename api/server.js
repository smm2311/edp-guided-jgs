// server.js

import express from "express";
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000; // You can choose any port number

const mongodb_url = process.env.MONGO_URL;
const mongodb_name = process.env.MONGO_DB;

console.log(mongodb_url)
console.log(mongodb_name)

// Create a GET route for /api/planets
app.get('/api/planets', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("planets");
        const planets = await collection.find().toArray();
        res.json(planets);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});

app.get('/api/planets/:id', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("planets");
        const planet = await collection.findOne({id: +req.params.id});
        res.json(planet);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});