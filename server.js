const express = require('express');
require('dotenv').config();
const app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
 console.log(`Trying out environment variables over on http://localhost:${app.get('port')}`);
});

//Project table and Palette table

//GET - all projects
app.get('/api/v1/projects', (request, response ) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json({error});
    })
})
//GET - all palettes

//GET - individual project
//GET - individual palette

//POST - individual project
//POST - individual palette

//PUT - individual project
//PUT - individual palette

//DELETE - individual projec
//DELETE - individual palette