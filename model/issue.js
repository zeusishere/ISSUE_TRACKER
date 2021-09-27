const  mongoose = require("mongoose") ;
const {Schema} = mongoose ;
const issueSchema = new  Schema( {
    issueName :{
        type : String,
        required :true ,
    },
    issueDescription :{
        type:String ,
        default:"This field is Empty",
        max : 400,
    },
    project :{
        type: mongoose.Types.ObjectId ,
        ref :"Project"
    },
    label :[{
        type:String 
    }],
    issueAuthor :{
        type : String 
    }

},
{
    timestamps:true
} ,
)  ;

// creator user, project ,status , labels

const Issue = mongoose.model("Issue",issueSchema);
module.exports =Issue  ;