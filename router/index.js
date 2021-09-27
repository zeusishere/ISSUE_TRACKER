const express = require("express");
const router = express.Router();
const Project = require("../model/project");
const projectController = require("../controller/project_controller");
router.get("/", projectController.renderHomePage );



//  routes for projects
router.use("/projects", require("./project"))
// router for issues
router.get("/issues",(req,res)=>
{
    res.send("hello")
})
router.use("/issues", require("./issue") )
module.exports = router;