const db=require('../models');
 
exports.getProjects=(req,res)=>{
    db.Project.find()
    .then(function(projects){
        res.json(projects);
    })
    .catch((err)=>{res.send(err)})
}

exports.createProject=(req,res)=>{
    db.Project.create(req.body)
        .then(newProject=>{
            res.status(201).json(newProject);
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.getSingleProject=(req,res)=>{
    db.Project.findById(req.params.projectId)
        .then(foundProject=>{
            res.json(foundProject);
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.updateProject=(req,res)=>{
    db.Project.findOneAndUpdate(
        //First Parameter is How to find it 
        {
        _id:req.params.projectId
        },
        //newData to be updated
        req.body,
        //By default after updateing the changes monggosse will return the old value and not the updated value..so we can change that by following line
        {new:true})
            .then(updatedProject=>{
                res.json(updatedProject);
            })
            .catch(err=>{
                res.send(err)
            });
}

exports.deleteProject=(req,res)=>{
    db.Project.deleteOne({
        _id:req.params.projectId
    })
        .then(()=>{
            res.json({message:"The Project is deleted"})
        })
        .catch(err=>{
            res.send(err);
        })
}