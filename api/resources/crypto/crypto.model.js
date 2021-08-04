const mongosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose');

let CryptoSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    icon : {
        type : String,
        required: true
    },
    abbr : {
        type : String,
        required: true
    },
    priceNaira : {
        type : Number,
        required: true
    },
    priceDollar : {
        type : Number,
        required: true
    },
    walletAddress : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        default: Date.now()
    },
});

CryptoSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Crypto", CryptoSchema);