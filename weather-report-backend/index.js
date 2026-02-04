import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('weather-report-backend is running');
});

const METEO_API_BASE_PATH = 'https://api.meteo.lt/v1';

app.get('/', async (req, res) => {
    try {
        res.json('weather-report-backend is running');
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch'});
    }
});


app.get('/places', async (req, res) => {
    try {
        const response = await fetch(METEO_API_BASE_PATH + '/places');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch places'});
    }
});

app.get('/places/:placeCode', async (req, res) => {
    const placeCode = req.params.placeCode;
    try {
        const response = await fetch(METEO_API_BASE_PATH + `/places/${placeCode}/forecasts/long-term`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch place'});
    }
});

app.post('/places/viewed', async (req, res) => {
    try {
        const { code } = req.body;
        const now = new Date();
        console.log(`Viewed: '${code}', at ${now}`);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post viewed place'});
    }
});