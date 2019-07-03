const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
// const bodyParser = require("body-parser");

require('dotenv').config();
app.use(express.json());
app.set('port', process.env.PORT || 3001);
// app.use(bodyParser.json());



app.listen(app.get('port'), () => {
 console.log(`Trying out environment variables over on http://localhost:${app.get('port')}`);
});


app.locals.projects = []


app.get('/api/v1/projects', async (request, response ) => {
  const projects = await database('projects').select();
  response.status(200).json(projects);
})

app.get('/api/v1/projects/:id', async (request, response ) => {
  const project = await database('projects').where('id', request.params.id).first();
  response.status(200).json(project);
})

app.get('/api/v1/palettes', async (request, response)=> {
  const palettes = await database('palettes').select();
  response.status(200).json(palettes)
})

app.get('/api/v1/palettes/:id', async (request, response) => {
  const palette = await database('palettes').where('id', request.params.id).first();
  response.status(200).json(palette)
})


//POST - individual project
//POST - individual palette

//PUT - individual project
//PUT - individual palette

//DELETE - individual projec
//DELETE - individual palette
 module.exports = app;