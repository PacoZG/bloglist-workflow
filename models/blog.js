const mongoose = require('mongoose')

let blogSchema = mongoose.Schema({
  url: {
    type: String,
    required: [true, 'is required']
  },
  title: {
    type: String,
    required: [true, 'required'],
    minlength: [5, 'minimun lenght (5)']
  },
  author: {
    type: String,
    required: [true, 'required'],
    minlength: [5, 'minimun lenght (5)']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number
  },
  comments: [
    {
      type: String,
    }
  ]
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)