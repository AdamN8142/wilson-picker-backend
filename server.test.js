const request = require('supertest')
const server = require('./server.js')
const environment = process.env.NODE_ENV || 'test'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {
    // beforeEach(async() => {
    //     await database.seed.run()
    // });
    describe('GET /api/v1/projects', () => {
        it('should return all the projects in the database', async () => {
            const expectedProjects = await database('projects').select();
            const response = await request(app).get('/projects');
            const projects = response.body;
            expect(projects).toEqual(expectedProjects)
        });
    });
    describe('GET /api/v1/projects/:id', () => {
        it('should return a project of the specified id', async () => {
           const expectedProject = await database('projects').first();
           const id = expectedProject.id
           const response = await request(app).get(`/projects/${id}`);
           const project = response.body;
           expect(project).toEqual(expectedProject)

        })
    })
})