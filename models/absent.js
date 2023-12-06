const mongoose = require('mongoose');

const absentschema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, require: true },
    id: { type: Number, require: true },
    staffName: { type: String, require: true },
    daysleave: { type: Number, require: true },
    daysfrom: { type: String, require: true },
    daysto: { type: String, require: true },
    description: { type: String, require: true },
    verified: { type: Boolean, default: false },

}, { timestamps: true });
const AbsentDb = mongoose.model('absent', absentschema);
module.exports = { AbsentDb }