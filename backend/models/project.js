var mongoose=require('mongoose');


var projectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:"Name cannot be blank"
    },
    tree:{
        type:Object,
        default:{
            "id":"4562",
            "name":"App",
            "state":{
                
                },
            "props":{
                
            },
            "children":[]    
        }
    },
    created_date:{
        type:Date,
        default:Date.now
    }

});

var Project=mongoose.model('Project',projectSchema);

module.exports=Project;


//name
//tree
//timecreated
