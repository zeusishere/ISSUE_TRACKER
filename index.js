const express = require("express");
const env = require("./config/environment")
const app = express();
const mongoose = require("./config/mongoose");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}


// acquire all the db models below this point
const Project = require("./model/project");
const Issue = require("./model/issue");
// acquired all the db models above this point
// acquire all middleware below this line
const Layout = require("express-ejs-layouts");
const { asset_path } = require("./config/environment");
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractScripts", true)
app.set("layout extractStyles", true);
// accquire all middleware above this line
app.use(express.urlencoded(
    { extended: true }
));
app.use(express.json());
app.use(Layout);
app.use(express.static(env.asset_path))

app.use("/", require("./router"));
app.listen(port, (err) => {
    if (err) {
        console.log("Error in starting server : ", err);
        return;
    }
    console.log("server is running successfully on port :", port);
}
)