const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    value: String,
    label: String,
    children: [],
});


mongoose.model('City', citySchema);