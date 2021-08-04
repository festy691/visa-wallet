const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let ReportSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    date : {
        type : Date,
        default : Date.now()
    },
});

ReportSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Report", ReportSchema);