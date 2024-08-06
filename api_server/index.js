const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
    res.status(301).send('Error retrieving the store.')
  });
});

//listen
app.listen(port, ()=>{
  console.log('App listening on port:', port);
});