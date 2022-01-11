// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance(beacuse by default only origin is allowed)
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port =5501;
const server = app.listen(port,()=>{
    console.log(`Server is now listening on port ${port}`)
});

//Routes
// Respond when a GET request is made to the homepage
app.get('/all', (req, res) => {
    res.send(projectData);
})

// POST request - creating
app.post('/add', (req, res) => {
    let data = req.body;
    res.send(`POST received, request: ${(JSON.stringify(data))}`)
    const newEntry= {
        date: data.date,
        temp: data.temp,
        content:data.feelings
    }

    projectData = newEntry;
})

