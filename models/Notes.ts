const { Schema, model, models } = require('mongoose');

const NoteSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [40, 'title can not exceed 40 characters'],
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'description can not exceed 200 characters'],
  },
});

module.exports = models.Note || model('Note', NoteSchema);
