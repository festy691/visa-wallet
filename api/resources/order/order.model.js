const mongosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    type : {
        type : String,
        default : 'sale',
        enum: ['sale','purchase']
    },
    crypto : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Crypto',
        required : true
    },
    status : {
        type: String,
        default : 'pending',
        enum: ['pending','processing','completed','rejected']
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
    },
    cryptoValue : {
        type : Number,
        required: true
    },
    receipt : {
        type : String,
        required: true
    },
    date : {
        type : Date,
        default: Date.now()
    },
});

OrderSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Order", OrderSchema);