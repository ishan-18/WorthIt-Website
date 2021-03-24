const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 14
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        min: 2,
        max: 14
    },
    full_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 14
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
},{
    timestamps: true
})

mongoose.model("User", userSchema)