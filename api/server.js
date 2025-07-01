// server.js

import express from "express";
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001; // You can choose any port number

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

app.get('/api/films/:id', async (req, res) => {
    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("films");
        const film = await collection.findOne({id: +req.params.id});
        res.json(film);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
})

app.get('/api/films/:id/characters', async (req, res) => {
    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        let collection = db.collection("films_characters");
        const characters = await collection.find({film_id: +req.params.id}).toArray();
        const character_ids = characters.map(c => c.character_id);
        console.log(character_ids);
        // map character ids to character names
        collection = db.collection("characters");
        const character_names = await Promise.all(character_ids.map(async (cid) => {

            const character = await collection.findOne({id: cid});
            return character.name;
        }));
        res.json(character_names);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
})

app.get('/api/films/:id/planets', async (req, res) => {
    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        let collection = db.collection("films_planets");
        const planets = await collection.find({film_id: +req.params.id}).toArray();
        const planet_ids = planets.map(p => p.planet_id);

        // map character ids to character names
        collection = db.collection("planets");
        const planet_names = await Promise.all(planet_ids.map(async (pid) => {

            const planet = await collection.findOne({id: pid});
            return planet.name;
        }));
        res.json(planet_names);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
})


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});