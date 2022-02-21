const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    username: String, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const sightingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
    title: String, 
    photoUrl: String,
    date: Date, 
    country: String,
    state: String, 
    city: String,  
    comments: [commentsSchema] // one sighting has many comments
})

module.exports = mongoose.model('Sighting', sightingSchema);