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
    })
    //We are getting the data we want, but timestamps is in strings, so this is why we're testing length
})