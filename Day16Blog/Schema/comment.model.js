const { model, Schema } = require('mongoose')

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    timeseries: true
})

const Comment = model("Comment", CommentSchema);
module.exports = Comment;