import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());

app.listen(3000, () => {
    console.log('weather-report-backend is running');
});

const METEO_API_BASE_PATH = 'https://api.meteo.lt/v1';

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