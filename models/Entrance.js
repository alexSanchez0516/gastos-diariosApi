const { Schema, model } = require('mongoose');

const EntranceSchema = Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },

    img_url: {
        type: String,
        required: false
    }
    ,

    paid: {
        type: Boolean,
        required: true
    },

    date_paid: {
        type: Date,
        required: false
    },

    category: {
        type: Number,
        required: true
    },
    create_at: {
        type: Date,
        required: true
    },
    update_at: {
        type: Date,
        required: false
    }
});
module.exports = model('Entrance', EntranceSchema);
