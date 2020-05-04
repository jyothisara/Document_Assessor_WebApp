const mongoose = require('mongoose');


const formSchema = new mongoose.Schema({
    link: {
        type: String
      },
    text: {
        type: String,
        required: true
      },
    rating: {
        type: Number,
        required: true
      }
});

module.exports = mongoose.model('Form', formSchema);