const Project = require("../model/project")
const Issue = require("../model/issue");

// action to display projects on homepage
module.exports.renderHomePage = async (req, res) => {
   const projects =await Project.find({});
   let issueCount = await Issue.countDocuments();
   return res.render("home", { projects: projects,issueCount:issueCount });

}


// action to render form to create a new project
module.exports.renderProjectForm = (req, res) => {
   return res.render("create_project.ejs",{ homeLink:true })
}
// action to submit a project
module.exports.createProject = (req, res) => {
   // console.log(req.body) ;
   Project.create(req.body, (err, project) => {
      if (err) {
         console.log("error in  creating project in db :", err);
         return;
      }
   });
   res.redirect("/");
}
// view an existing project
module.exports.viewProject = async (req, res) => {
   const project = await Project.findById(req.params.id)

   console.log("project is , ", project.id)
   let issuesList = await Issue.find({ project: project.id }).exec();
   let uniqueAuthors = [], uniqueLabels = [];
   for (let item of issuesList) {
      if (!uniqueAuthors.includes(item.issueAuthor)) {
         uniqueAuthors.push(item.issueAuthor);
      }
      for (let label of item.label) {
         if (!uniqueLabels.includes(label)) {
            uniqueLabels.push(label);
         }
      }
   }
   console.log(uniqueAuthors, uniqueLabels);
   // console.log("issuelist is ", issuesList, project.id);
   return res.render("project_main", {
      project: project, issues: issuesList,
      uniqueAuthors: uniqueAuthors,
      uniqueLabels: uniqueLabels,
      homeLink:true
   });
}
// api
module.exports.filterIssues = async function (req, res) {
   console.log("nnnnnnnnn", req.body);
   // query used to search the database
   let searchQuery = {
      "labels": {},
      "authors": {}
   };
   if (req.body.labels.length == 0) {
      searchQuery["labels"]["$exists"] = true;
   }
   else {
      searchQuery["labels"]["$in"] = req.body.labels;
   }
   //for  authors
   if (req.body.authors.length == 0) {
      searchQuery["authors"]["$exists"] = true;
   }
   else {
      searchQuery["authors"]["$in"] = req.body.authors;
   }
   let results = await Issue.find({
      issueAuthor: searchQuery["authors"],
      label: searchQuery["labels"]
   });

   return res.json(results);

}
// api
module.exports.searchIssues = async (req, res) => {
   console.log(req.body);
   const results = await Issue.find({
      $or: [{
         issueName: { $regex: req.body.searchKey, '$options': 'i' }
      }, {
         issueDescription: { $regex: req.body.searchKey, '$options': 'i' }
      }]
   });
   console.log(results);
   return res.json(results)
}


