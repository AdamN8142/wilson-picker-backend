const projects = [
  {project_name: 'Fall Colors'},
  {project_name: 'Spring Colors'}
];

const palettes = [
  {
    palette_name: 'Fall Palette',
    color_1: '#99A3A4',
    color_2: '#4B939B',
    color_3: '#C5A530',
    color_4: '#6A288A',
    color_5: '#17CB61'
  },
  {
    palette_name: 'Spring Palette',
    color_1: '#A57F32',
    color_2: '#32A0A5',
    color_3: '#482ACF',
    color_4: '#C219D6',
    color_5: '#F5461F'
  }
];

const createProject = (knex, project) => {
  return knex('projects')
    .insert({
      project_name: project.project_name,
    }, 'id')
    .then(id => {
      let palettePromises = [];

      palettes.forEach(palette => {
        palettePromises.push(createPalette(knex, {
              palette_name: palette.palette_name,
              project_id: id[0]
            })
        )
      });
      return Promise.all(palettePromises)
    })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
}

exports.seed = function(knex) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = [];

      projects.forEach(project => {
        projectPromises.push(createProject(knex, project))
      });
      return Promise.all(projectPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
