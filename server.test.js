const environment = process.env.NODE_ENV || 'test'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const request = require('supertest')
const app = require('./server.js')

describe('Server', () => {
    beforeEach(async() => {
        await database.seed.run()
    });
    describe('GET /api/v1/projects', () => {
        it('should return all the projects in the database', async () => {
            const expectedProjects = await database('projects').select();
            const response = await request(app).get('/api/v1/projects');
            const projects = response.body;
            expect(projects.length).toEqual(expectedProjects.length)
        });
    });
    describe('GET /api/v1/projects/:id', () => {
        it('should return a project of the specified id', async () => {
           const expectedProject = await database('projects').first();
           const id = expectedProject.id
           const response = await request(app).get(`/api/v1/projects/${id}`);
           const project = response.body;
           expect(project.length).toEqual(expectedProject.length)
        })
    });
    describe('GET /api/v1/palettes', () => {
        it('should return all the palettes in the database', async () => {
            const expectedPalettes = await database('palettes').select();
            const response = await request(app).get('/api/v1/palettes');
            const palettes = response.body;
            expect(palettes.length).toEqual(expectedPalettes.length)
        });
    });
    describe('GET /api/v1/palettes/:id', () => {
        it('should return a palette of the specified id', async () => {
           const expectedPalette = await database('palettes').first();
           const id = expectedPalette.id
           const response = await request(app).get(`/api/v1/palettes/${id}`);
           const palette = response.body;
           expect(palette.length).toEqual(expectedPalette.length)
        })
    });
    describe('POST /api/v1/projects', () => {
        it('should post a new project to the database', async () => {
            const newProject = {project_name: "Summer Colors"}
            const response = await request(app)
                                    .post('/api/v1/projects')
                                    .send(newProject)
           const projects = await database('projects').where('id', response.body.id).select();
           const project = projects[0];
           expect(project.project_name).toEqual(newProject.project_name)
        });
    });

    //We are getting the data we want, but timestamps is in strings, so this is why we're testing length
})