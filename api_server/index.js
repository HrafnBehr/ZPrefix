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

  function authToken(req, res,next){
    const authHeader = req.headers['authorization'];
    const token =  authHeader && authHeader.split(' ')[1];

    if(token == null) {
      return res.status(401).json({message:"no token!"});
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({ message:"token is wrong nerd."});
      }
      req.user = user;
      next();
    })

  }


//routes
app.get('/', (req,res) => {
  res.status(200).send('I am working');
})

app.get('/store', (req,res) => {
  const {search} = req.query;
  knex("Store")
    .modify(queryBuilder =>{
      if(search){
        queryBuilder.where('itemName','like',`${search}`);
      }
  })
  .then(data => {
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
    // check if they actually even go here and  know our secret word
    const user = await knex("users").where({username}).first();
    if (!user || !bcrypt.compareSync(password, user.password)){
      return res.status(400).json({message: "Invalid username or password"})
    }
    // and generate a token  here
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.status(200).json({token, username: user.username});
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again later."});
  }
})

app.post('/addItem', authToken, async (req, res) => {
  const { itemName, description, quantity } = req.body;
  const userID = req.user.id;

  try{
    const newItem = await knex('Store').insert({
      userID: userID,
      itemName: itemName,
      description: description,
      quantity: quantity
    }).returning("*")
    res.status(201).json(newItem);

  }catch(error){
    console.error("couldn't add that one chief", error);
    res.status(500).json({ message: "Failed to add item"})
  }
})

app.get('/userItems', authToken, async (req, res) => {
  const userID = req.user.id;

  try{
    const items = await knex('Store').where({ userID: userID});
    res.status(200).json(items);
  } catch(error){
    console.error("Could not find your items!");
    res.status(500).json({ message: "Failed to retrieve your items"})
  }
})

app.patch('/Store/:itemID', authToken, async (req,res)=>{
  const {itemID} = req.params;
  const {itemName, description, quantity} = req.body;

  try{
    const userID = req.user.id;
    const updated = await knex('Store')
    .where({ id: itemID})
    .update({
      userID: userID,
      itemName: itemName,
      description: description,
      quantity: quantity
      })
    .catch(err=>console.log(err))

      if(updated){
        const updatedItem = await knex('Store').where({ id: itemID}).first();
        res.status(200).json(updatedItem);
      } else {
        res.status(404).json({message: "Could not be found, so did not update"});
      }

  }catch(error){
    console.error(error)
    res.status(500).json({message: "failed to update item"});
  }
});

app.delete('/selected/:itemID', authToken, async (req,res) => {
  const {itemID} = req.params;

  try{
    const deleted = await knex('Store')
      .where({ id: itemID })
      .del();
    if (deleted){
      res.status(200).json({message: "Item removed"});
    } else {
      res.status(404).json({message: "Could not be found, so did not remove"});
    }
  } catch(error){
    console.error("Could not delete  the item")
    res.status(500).json({message: "failed to remove item"});
  }
})

//listen
app.listen(port, ()=>{
  console.log('App listening on port:', port);
});