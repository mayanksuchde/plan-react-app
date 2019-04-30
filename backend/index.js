const express=require('express'),
    app=express(),
    PORT=8080,
    bodyParser=require('body-parser'),
    cors=require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000' }));


var projectRoutes=require('./routes/projects');

app.get('/',(req,res)=>{
    res.send('from root route');
});

app.use('/api/projects',projectRoutes);

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});