const mongoose =require('mongoose');

const musicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,   
    },
    artist: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    mp3file: {
        type: String,
        default: 'placeholder.mp3',
    },
    created_on: {
        type: Date,
        default: new Date(),
    },

})

var musicModel=mongoose.model('music',musicSchema);
module.exports= musicModel;