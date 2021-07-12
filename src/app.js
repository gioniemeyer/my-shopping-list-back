import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/items', async (req, res) => {
    const resp = await connection.query(`
        SELECT * FROM shops  
    `)
    return res.status(200).send(resp.rows);
});

app.post('/items', async (req, res) => {

    const {text} = req.body;

    if(text?.length === 0 || typeof(text) !== String) return res.sendStatus(404);

        await connection.query(`
        INSERT INTO shops (text) VALUES ($1)`, [text])

        return res.sendStatus(201);


})

export default app;
