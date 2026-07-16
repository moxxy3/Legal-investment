const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: String,

    country: String,

    password: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        default: 0
    },

    role: {
        type: String,
        default: "user"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);