var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");


var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://chinmay8010:kuttusan123@cluster0.ke8c0qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME  = "To-Do-App";
var database;

app.listen(5038,()=>{
    MongoClient.connect(
        CONNECTION_STRING,(
            err,client
        )=>{
            database=client.db(DATABASENAME);
            console.log("MongoDB Connection Successful")
        });
})

app.get('/api/To-Do-App/GetNotes',(request,response) => {
    database.collection("todoappcollection").find({}).toArray((error,result) =>{
        response.send(result);
    });
})

app.post('/api/To-Do-App/AddNote',multer().none(),(request,response) => {
    database.collection("todoappcollection").count({},function(err,numOfDocs){
        database.collection("todoappcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully");
    })
})

app.delete('/api/To-Do-App/DeleteNote/:id',(request,response) => {
    database.collection("todoappcollection").deleteOne({
        id:request.query.id
    });
    response.json("Deleted Successfully");
})