// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

// Build our routes

//Gets hard data from the programmers.json file
app.get('/', (req, res) => {
  res.json(database);
});

//Gets the id of a programmer located within our programmers.json
app.get('/:id', (req, res) => {
  const { id } = req.params;
  const found = database.find(record => record.SID === id);
  res.json(found)
});

//Puts an id of a slave onto the server-page
app.put('/:id', (req, res) => {
  const id = req.params.id;
  let index;
  const found = database.map((user, idx) => {
    if(user.SID === id){
      index = idx;
    }
  });

  const updatedUser = {...database[index], ...req.body};
  database[index] = updatedUser;
  res.json(updatedUser);
});

//Posts a new programmer to our server :D
app.post('/', (req,res) => {
        const body = req.body;
        database.push(body);
        res.json(body);
});
// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE

app.all('*', (req, res) => res.json('That route does not exitst!'));
app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});
