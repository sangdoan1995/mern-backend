const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    reminderMsg: { type: String, require: true },
    remindAt: { type: String, require: true },
    isReminded: Boolean,
    toEmail: { type: String, require: true },
}, { timestamps: true });

module.exports = mongoose.model("reminder", reminderSchema);
