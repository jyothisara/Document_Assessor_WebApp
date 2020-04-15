const mongoose = require('mongoose');
require('mongoose-type-url');

const formSchema = new mongoose.Schema({
    link: {
        type: mongoose.SchemaTypes.Url,
        required: true
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

