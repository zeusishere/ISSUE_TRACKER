const mongoose = require("mongoose");
const {Schema} = mongoose ;

const labelSchema = new Schema ({
    labelTitle:{
        type:String,
        required:true 
    },
    // labelDescription:{
    //     type:String ,
    //     max : 200,
    // }

});
module.exports = mongoose.model("Label" ,labelSchema );