const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    text: { type: String, required: true },
    userId: { type :Schema.Types.ObjectId, ref: 'User' },
    date: {type: Date, required:true}
});

module.exports = model('Comment', commentSchema);