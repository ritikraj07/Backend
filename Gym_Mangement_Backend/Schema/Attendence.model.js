let { Schema, model } = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        default: (Date().split(' ').map((day, i) => i < 4 ? day + ' ' : '')).join('')
    }
});
const Attendance = model('Attendance', attendanceSchema);

module.exports = { Attendance }