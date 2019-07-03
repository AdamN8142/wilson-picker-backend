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
    describe('POST /api/v1/palettes', () => {
        it('should post a new palette to the database', async () => {
            const { id } = await database('projects')
            .first()
            .select('id');
            const newPalette = {
                                palette_name: "Summer Colors",
                                color_1: "red",
                                color_2: "green",
                                color_3: "blue",
                                color_4: "pink",
                                color_5: "orange",
                                project_id: id
                            }
            const response = await request(app)
                                    .post('/api/v1/palettes')
                                    .send(newPalette)
           const palettes = await database('palettes').where('id', response.body.id).select();
           const palette = palettes[0];
           expect(palette.palette_name).toEqual(newPalette.palette_name)
        });
    });
    describe('PUT /api/v1/projects/:id', () => {
        it('should update a project', async () => {
            const projectToUpdate = await database('projects').first();
            const { id } = projectToUpdate;
            projectToUpdate.project_name = 'Colorado Colors';
            const response = await request(app)
                .put(`/api/v1/projects/${id}`)
                .send(projectToUpdate)
            const project = await database('projects')
                .where({ id })
                .first();
            expect(project.project_name).toEqual(projectToUpdate.project_name)
        })
    });

    //We are getting the data we want, but timestamps is in strings, so this is why we're testing length
})