// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    numbers: [{
        type: String,
        required: true,
        unique: true
    }],
    image: {
        type: String, // URL or path to the uploaded image
    }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
