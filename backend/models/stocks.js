const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true,
        unique:true

    }

  });

  module.exports = mongoose.model('stocks', stockSchema);