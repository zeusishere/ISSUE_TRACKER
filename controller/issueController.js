const Project = require("../model/project") ;
const Issue= require("../model/issue.js") ;
// render submit issue form
module.exports.issueForm = (req,res)=>
{

    const   projectID=req.params.projectID;
    const project = Project
        .findById(projectID,"label")
        .exec(function(err, project )
        {
            if(err)
                return console.log("error");

                
                res.render("create_issue",{labels:project.label,
                    projectID:projectID,
                    projectLink:true});
        })
    
} ;
// add issue to project
module.exports.createIssue = async(req , res)=>
{
    const   projectID=req.params.projectID;
    req.body.project=projectID ;
    // find the project from collection
    const project =await Project
        .findById(projectID,"label")
         ;
        // console.log(project,"erwrf");
    
    // handle lable list to create and add labels to project 
    let lableList = [] ;
    let createLableList = (str)=>
    {
        let start = 0;
        let end ;
        while(start != str.length)
        {
            end=str.indexOf(" ",start+1) ;
            lableList.push(str.substring(start,end).trim() ) ;
            project.label.push(str.substring(start,end)) ;
            start=end+1 ;
        }

        // console.log("project.label",project.label); 
        project.save() ;
    
    } 
    // calling the fn to create lable list
    createLableList(req.body["label_list"]) ;
    // console.log(lableList, typeof(lableList))
    const issue = await Issue.create({
        issueName : req.body.issueName ,
        issueDescription : req.body.issueDescription,
        project : project.id ,
        issueAuthor : req.body.issueAuthor,
        label:lableList
    } ) ;
    // console.log(issue);
    return    res.redirect(`/projects/${project._id}`)
}