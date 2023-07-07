const { model, Schema } = require('mongoose')

const PasteBinSchema = new Schema({
    content: {
        require: true,
        type: String
    },
    password: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const PasteBin = model('PasteBin', PasteBinSchema)
module.exports = PasteBin