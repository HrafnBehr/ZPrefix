const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const port = 5050;

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV||"development"]
);

//create app
const app = express();

//middleware
  // json, this will handle the json
  app.use(express.json());
  // cors
  app.use(cors());
  // morgan, a logging tool
  app.use(morgan('tiny'));
  // body-parser
  app.use(bodyParser.json());


//routes
app.get('/', (req,res) => {
  res.status(200).send('I am working');
})

app.get('/store', (req,res) => {
  knex("Store")
    .then(data =>{
      res.status(200).json(data);
  })
  .catch((err)=>{
    console.log(err);
    res.status(500).send('Error retrieving the store.')
  });
});

app.get('/users', (req, res) => {
  knex("users")
    .then(data =>{
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving users.")
    })
})

app.post('/createAccount', async (req, res) => {
  const { fname, lname, username, password} = req.body;
  // checks to see if the username exist
  let usernameCheck = await knex('users').select('*').where('username', username);
  if(usernameCheck.length === 0){
  const hashedPassword = await bcrypt.hashSync(password, 10);
  await knex('users').insert({
    first_name: fname,
    last_name: lname,
    username: username,
    password: hashedPassword
  })
      res.status(201).json({ message: 'User created successfully' });
  } else {
      res.status(400).json({ message: 'Username already exists' });
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try{
    // check if they actually even go here
    const user = await knex("users").where({username}).first();
    if (!user){
      return res.status(400).json({message: "Invalid username"})
    }
    // check if the password is valid
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword){
      return res.status(400).json({message: "Invalid password"})
    };
    // and generate a token  here
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({token, username: user.username});
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later."});
  }
})

//listen
app.listen(port, ()=>{
  console.log('App listening on port:', port);
});