const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    // Voit lisätä muita kenttiä, kuten kommentoija, aikaleima jne., tarpeen mukaan
})

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comments: [commentSchema], // Tallennetaan kommentit tähän taulukkoon
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.likes = returnedObject.likes || 0
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)
