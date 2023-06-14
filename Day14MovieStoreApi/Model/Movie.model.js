// import mongoose from 'mongoose';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const moviesSchema = new Schema({
    title: { type: String, required: true },
    vote_average: { type: Number, required: false },
    popularity: { type: Number, required: false }

});

export let imdb = mongoose.model('imdb', moviesSchema, 'imdb');



