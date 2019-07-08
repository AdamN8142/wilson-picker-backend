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

app.post('/api/v1/projects', (request, response) => {
  const { project_name }  = request.body;
  if(!project_name) {
    response.status(422).json({
      error: 'You are missing a project name. Please specify a name and try again.'
    })
  } else {
    const newProject = request.body
    database('projects').insert(newProject, 'id') 
    .then(id => {
      response.status(201).json({ id: id[0] })
    })
    .catch(error => {
      response.status(500).json({error})
    })
  }
});

app.post('/api/v1/palettes', (request, response) => {
  const newPalette  = request.body;
  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id']) { 
    if (!newPalette[requiredParameter]) {  
      return response 
        .status(422) 
        .send({ error: `Expected format: { palette_name: <String>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>, project_id: <Integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  database('palettes').insert(newPalette, 'id') 
    .then(id => { 
      response.status(201).json({ id: id[0] })
    })
    .catch(error => { 
      response.status(500).json({ error });
    });
});

app.put('/api/v1/projects/:id', (request, response) => {
  const { project_name } = request.body;
  const { id } = request.params;
  if (!project_name) {
    response.status(422).json({
      error: 'You did not update the project name. Please update if you so wish.'
  })
  } else {
    database('projects')
      .where({id})
      .update({project_name})
      .then(project => {
        if(!project) {
          response.status(404).json({error: `Project not found with ${id}`})
        } else {
          response.status(204).send();
        }
      })
      .catch(error => {
        response.status(500).json({error})
      })
  }
})

app.put('/api/v1/palettes/:id', (request, response) => {
  const palette = request.body;
  const { id } = request.params;
  for (let requiredParameter of ['palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5', 'project_id']) { 
    if (!palette[requiredParameter]) {  
      return response 
        .status(422) 
        .send({ error: `Expected format: { palette_name: <String>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>, project_id: <Integer> }. You're missing a "${requiredParameter}" property.` });
    }
  }
    database('palettes')
      .where({id})
      .update({...palette})
      .then(result => {
        if(!result) {
          response.status(404).json({error: `Project not found with ${id}`})
        } else {
          response.status(204).send();
        }
      })
      .catch(error => {
        response.status(500).json({error})
      })
  })

  app.delete('/api/v1/projects/:id', (request,response) => {
    const { id } = request.params;
    database('projects')
      .where({id})
      .del()
      .then(result => {
        if(result){
          response.status(204).send();
        } else {
          response.status(404).json({
            error: `Sorry, could not find project to delete with ${id}`
          })
        }
      })
      .catch(error => {
        response.status(500).json({error})
      })
  })



  app.delete('/api/v1/palettes/:id', (request,response) => {
    const { id } = request.params;
    database('palettes')
      .where({id})
      .del()
      .then(result => {
        if(result){
          response.status(204).send();
        } else {
          response.status(404).json({
            error: `Sorry, could not find palette to delete with ${id}`
          })
        }
      })
      .catch(error => {
        response.status(500).json({error})
      })
  })




























app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  database('palettes').where({ id }).delete()
  .then(palette => {
    if (!palette) {
      response.status(404).json({ error: 'This palette does not exist. Nothing was deleted.'})
    } else {
      response.status(200).send('The palette was deleted')
    }
  })
  .catch(error => {
    response.status(500).json({error})
  })
})
 module.exports = app;