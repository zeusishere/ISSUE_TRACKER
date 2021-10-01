const env= require("./environment.js") ;
const username =env.username ;
const password =env.password ;
const clusterName =env.clusterName;
const dbName = env.dbName ;

const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.yfkka.mongodb.net/${dbName}?retryWrites=true&w=majority`
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