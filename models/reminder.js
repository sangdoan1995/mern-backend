const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    tokenId: {
        type: String,
        required: true,
    },
    reminderMsg: { type: String, require: true },
    remindAt: { type: String, require: true },
    isReminded: Boolean,
    toEmail: { type: String, require: true },
}, { timestamps: true });

module.exports = mongoose.model("reminder", reminderSchema);
