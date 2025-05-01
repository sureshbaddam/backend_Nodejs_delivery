const mongoose = require("mongoose");

const firmScheema = new mongoose.Schema({
    firmname: {
        type: String,
        required: true,
        unique: true,
    },
    area: {
        type: String,
        required: true,
    },
    category: {
        type: [
            {
                type: String,
                enum: ["veg", "non-veg"],
            },
        ],
    },
    region: {
        type: [
            {
                type: String,
                enum: ["north", "south", "chinese", "bakery"],
            },
        ],
    },
    offer: {
        type: String,
    },
    image: {
        type: String,
    },

    vendor: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        }
    ],
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]

});

const firm = mongoose.model("Firm", firmScheema);
module.exports = firm;
