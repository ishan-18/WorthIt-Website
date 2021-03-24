const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    c_name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        min: 2
    }
},{
    timestamps: true
})

mongoose.model("Category", categorySchema)