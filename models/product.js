const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
    ,
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true,
        default: "tea"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

})

module.exports = mongoose.model('Product', productSchema)