const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error)

// importing models
const Todo = require("./models/Todo")

//* setting todo routes
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})

app.post("/todo/new", async (req, res) => {
    const todo =  new Todo({
        text: req.body.text
    });

    try{
        const newtodo = await todo.save();
        res.status(201).json(newtodo);        
    }catch(err){
        res.status(400).json({messsage: err.messsage})
    }
    
})

app.delete("/todo/delete/:id", async(req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)

    // res.json({message: "Succesfully deleted"})
    res.json(result);
})

app.get("/todo/complete/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.listen(3001, () => console.log("Server started on port 3001"));