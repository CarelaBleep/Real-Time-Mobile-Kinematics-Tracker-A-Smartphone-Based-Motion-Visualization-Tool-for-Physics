import mongoose from 'mongoose';

const TrackSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    speed: Number,
    accuracy: Number,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Track', TrackSchema);
