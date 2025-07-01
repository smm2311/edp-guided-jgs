// server.js

import express from "express"
const app = express();
const port = 3000; // You can choose any port number

// Create a GET route for /api/planets
app.get('/api/planets', (req, res) => {
    // Return a fake test object
    const fakePlanet = {
        name: "Test Planet",
        climate: "temperate",
        terrain: "mountains",
        population: "unknown"
    };

    res.json(fakePlanet);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});