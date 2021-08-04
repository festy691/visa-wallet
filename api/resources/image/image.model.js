const mongoose = require('mongoose');
const mongosePaginate = require('mongoose-paginate');

let ImageSchema = new mongoose.Schema({
    image : {
        type : String,
        required: true
    },
});

ImageSchema.plugin(mongosePaginate);
module.exports = mongoose.model("Images", ImageSchema);