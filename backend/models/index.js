var mongoose= require("mongoose");
mongoose.set("debug",true);
mongoose.connect('mongodb://localhost:27017/plan-react-app',{useNewUrlParser:true});

mongoose.Promise=Promise;

module.exports.Project=require('./project');