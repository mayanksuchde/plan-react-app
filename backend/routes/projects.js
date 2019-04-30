var express=require('express');
var router=express.Router();
var db=require('../models')
var helpers=require('../helpers/projects')
router.route('/')
    .get(helpers.getProjects)
    .post(helpers.createProject);
    
router.route('/:projectId')
    .get(helpers.getSingleProject)
    .put(helpers.updateProject)
    .delete(helpers.deleteProject);

module.exports=router;