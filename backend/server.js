import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import Track from './models/track.js';

dotenv.config();
const app = express();
await connectDB();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 5000

app.post('/track', async (req, res) => {
    try {
        const { latitude, longitude, speed, accuracy } = req.body;
        
        const newTrack = new Track({
            latitude,
            longitude,
            speed,
            accuracy
        });

        await newTrack.save();
        console.log(`📍 Saved: ${latitude}, ${longitude} | Speed: ${speed} m/s`);
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/history', async (req, res) => {
    try {
        // Get the last 50 points, newest first
        const history = await Track.find().sort({ timestamp: -1 }).limit(50);
        res.json(history);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`)
})
