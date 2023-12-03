const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenAbsentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
        unique: true,
    },
    token: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now, expires: 3600 },
}, { timestamps: true });
const TokenAbsentSchema = mongoose.model("token-absent", tokenAbsentSchema)
module.exports = { TokenAbsentSchema };
