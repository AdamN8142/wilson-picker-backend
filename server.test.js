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
        it('should return a status of 200 if all the projects are returned', async () => {
            const response = await request(app).get('/api/v1/projects')
            expect(response.status).toBe(200) 
        });
    });
    describe('GET /api/v1/projects/:id', () => {
        it('should return a project of the specified id', async () => {
           const expectedProject = await database('projects').first();
           const id = expectedProject.id
           const response = await request(app).get(`/api/v1/projects/${id}`);
           const project = response.body;
           expect(project.length).toEqual(expectedProject.length)
        });
        it('should return a status of 200 if the specified proejct is returned', async () => {
            const expectedProject = await database('projects').first();
            const id = expectedProject.id
            const response = await request(app).get(`/api/v1/projects/${id}`);
            expect(response.status).toBe(200) 
        });
    });
    describe('GET /api/v1/palettes', () => {
        it('should return all the palettes in the database', async () => {
            const expectedPalettes = await database('palettes').select();
            const response = await request(app).get('/api/v1/palettes');
            const palettes = response.body;
            expect(palettes.length).toEqual(expectedPalettes.length)
        });
        it('should return a status of 200 if all the palettes are returned', async () => {
            const response = await request(app).get('/api/v1/palettes')
            expect(response.status).toBe(200) 
        });
    });
    describe('GET /api/v1/palettes/:id', () => {
        it('should return a palette of the specified id', async () => {
           const expectedPalette = await database('palettes').first();
           const id = expectedPalette.id
           const response = await request(app).get(`/api/v1/palettes/${id}`);
           const palette = response.body;
           expect(palette.length).toEqual(expectedPalette.length)
        });
        it('should return a status of 200 if the specified palette is returned', async () => {
            const expectedPalette = await database('palettes').first();
            const id = expectedPalette.id
            const response = await request(app).get(`/api/v1/palettes/${id}`);
            expect(response.status).toBe(200) 
        });
    });
    describe('POST /api/v1/projects', () => {
        it('should post a new project to the database', async () => {
            const newProject = {project_name: 'Summer Colors'}
            const response = await request(app)
                                    .post('/api/v1/projects')
                                    .send(newProject)
           const projects = await database('projects').where('id', response.body.id).select();
           const project = projects[0];
           expect(project.project_name).toEqual(newProject.project_name)
        });
        it('should return a status of 201 if the new proejct is added', async () => {
            const newProject = {project_name: 'Disney Colors'}
            const response = await request(app).post('/api/v1/projects').send(newProject)
            expect(response.status).toBe(201)
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
        it('should return a status of 201 if the new palette is added', async () => {
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
            const response = await request(app).post('/api/v1/palettes').send(newPalette)
            expect(response.status).toBe(201)
        });
    });
    describe('PUT /api/v1/projects/:id', () => {
        it('should update a project', async () => {
            const projectToUpdate = await database('projects').first();
            const { id } = projectToUpdate;
            projectToUpdate.project_name = 'Wyoming Colors';
            const response = await request(app)
                .put(`/api/v1/projects/${id}`)
                .send(projectToUpdate)
            const project = await database('projects')
                .where({ id })
                .first();
            expect(project.project_name).toEqual(projectToUpdate.project_name)
        })
    });
    describe('PUT /api/v1/palettes/:id', () => {
        it.skip('should update a palette', async () => {
            const paletteToUpdate = await database('palettes').first();
            const { id } = paletteToUpdate;
            paletteToUpdate.palette_name = 'Coolers';
            const response = await request(app)
                .put(`/api/v1/palettes/${id}`)
                .send(paletteToUpdate)
            const palette = await database('palettes')
                .where({ id })
                .first();
            expect(palette.palette_name).toEqual(paletteToUpdate.palette_name)
        })
    });
    describe('DELETE /api/v1/palettes/:id', () => {
        it('should delete the specified palette', async () => {
            const paletteToDelete = await database('palettes').first()
            const { id } = paletteToDelete
            const response = await request(app).delete(`/api/v1/palettes/${id}`)
            const deletedPalette = await database('palettes').where({id}).first();
            expect(deletedPalette).toEqual(undefined)
        });
        it('should return a status of 200 if the specified palette is deleted', async () => {
            const paletteToDelete = await database('palettes').first();
            const { id } = paletteToDelete
            const response = await request(app).delete(`/api/v1/palettes/${id}`)
            expect(response.status).toBe(200) 
        });
        it('should return a 404 error if no palette is deleted', async () => {
            const response = await request(app).delete(`/api/v1/palettes/65`)
            expect(response.status).toBe(404)
            expect(response.body.error).toEqual('This palette does not exist. Nothing was deleted.') 
        });
        
    })

    
})