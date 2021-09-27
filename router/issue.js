const express = require ("express") ;
const router =  express.Router();
const issueController = require("../controller/issueController");
router.get("/create-issue-form/:projectID",issueController.issueForm) ;
router.post("/create-issue/:projectID", issueController.createIssue) ;
module.exports = router ;