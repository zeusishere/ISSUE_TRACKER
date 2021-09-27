const username ="shubham" ;
const password ="2424554" ;
const clusterName ="cluster0";
const dbNAme ="issueTrackerDB"

const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.yfkka.mongodb.net/${dbNAme}?retryWrites=true&w=majority`
    , {
        useNewUrlParser: true ,
      
        useUnifiedTopology: true //
      }
) ;
const db = mongoose.connection ;

db.on("error", console.error.bind(console,"connection error :cannot connect to the db") ); // on vs once
db.once("open", ()=>
    {
        console.log("connected successfully to the Database")
    }
)