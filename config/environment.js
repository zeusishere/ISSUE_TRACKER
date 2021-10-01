const development = {
    name:"developement" ,
    asset_path :"./public" ,
    dbName :"issueTrackerDB",
    username:"shubham" ,
    password:"2424554",
    clusterName :"cluster0",
}
const production =  {
    name:"production" ,
    asset_path :process.env.asset_path ,
    dbName :"issueTrackerDB",
    username:process.env.issueTracker_mongoDB_username ,
    password:process.env.issueTracker_password,
    clusterName :"cluster0",
}
module.exports = development ;