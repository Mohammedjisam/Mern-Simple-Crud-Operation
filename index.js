const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/React_CRUD')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.put('/UpdateUser/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})


app.post('/CreateUser', async (req, res) => {
    try {
      const { name, email, age } = req.body;
      const newUser = new UserModel({ name, email, age });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  });

app.listen(3001, () => {
  console.log("server is running");
});
