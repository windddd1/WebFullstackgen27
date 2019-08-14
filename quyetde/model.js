const mongoose = require("mongoose");
const random = require('mongoose-simple-random');

const QuestionSchema = new mongoose.Schema({
    content : {
        type : String ,
        required : true,
    },
    like : {
        type : Number,
        default : 0,
    },
    dislike : {
        type : Number,
        default : 0,
    }
});

QuestionSchema.plugin(random);


const QuestionModel = mongoose.model('Question',QuestionSchema);

module.exports = QuestionModel;