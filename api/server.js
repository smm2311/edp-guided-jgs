// server.js

import express from "express";
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const mongodb_url = process.env.MONGO_URL;
const mongodb_name = process.env.MONGO_DB;

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

app.get('/api/characters/:id/films', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("films_characters");
        const filmCollection = db.collection("films");

        const filmIds = (await collection.find({character_id: +req.params.id}).toArray()).map(data => data['film_id']);

        let films = []
        for (const filmId of filmIds) {
            const filmData = await filmCollection.findOne({id: filmId});
            films.push(filmData);
        }

        res.json(films);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

app.get('/api/planets/:id/films', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("films_planets");
        const filmCollection = db.collection("films");

        const filmIds = (await collection.find({planet_id: +req.params.id}).toArray()).map(data => data['film_id']);

        let films = []
        for (const filmId of filmIds) {
            const filmData = await filmCollection.findOne({id: filmId});
            films.push(filmData);
        }

        res.json(films);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

});

app.get('/api/planets/:id/characters', async (req, res) => {

    let client;

    try {
        client= await MongoClient.connect(mongodb_url);
        const db = client.db(mongodb_name);
        const collection = db.collection("characters");
        const characters = (await collection.find({homeworld: +req.params.id}).toArray());

        res.json(characters);

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