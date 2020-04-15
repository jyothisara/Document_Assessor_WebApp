const mongoose = require('mongoose');
require('mongoose-type-url');

const resourceSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
      },
    links: [{
        type: mongoose.SchemaTypes.Url
        
      }],
    forms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Form'
        }
    ],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    submissionStatus: {
        type: Boolean,
        required: true
      }

    });

module.exports = mongoose.model('Resource', resourceSchema);