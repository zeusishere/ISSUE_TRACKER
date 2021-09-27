const express = require("express");
const port = 8000;
const app = express();
const mongoose = require("./config/mongoose");


// acquire all the db models below this point
const Project = require("./model/project");
const Issue = require("./model/issue");
// acquired all the db models above this point
// acquire all middleware below this line
const Layout = require("express-ejs-layouts");
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
app.use(express.static("public"))

app.use("/", require("./router"));
app.listen(port, (err) => {
    if (err) {
        console.log("Error in starting server : ", err);
        return;
    }
    console.log("server is running successfully on port :", port);
}
)