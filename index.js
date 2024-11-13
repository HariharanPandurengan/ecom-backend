const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express()
const corsOptions = { 
    origin: '*', 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json())

mongoose.connect('mongodb+srv://hariharanpandurengan:aTBobFmCeSYBa8du@cluster0.wqjyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.error(err);
});

const AdminSchema = new mongoose.Schema({
    username : String,
    password : String,
}, { collection: 'Admin' }); 

const AdminSchemaModel = mongoose.model('Admin', AdminSchema);

app.post('/AdminLogin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const Admin = await AdminSchemaModel.find({username:username,password:password});
        if(Admin.length !== 0){
            res.json({status:true})
        }    
        else{
            res.json({status:false})
        }      
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
