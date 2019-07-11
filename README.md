# Wilson Picker 

Based off of the 90's show, 'Home Improvement, this app allows users to generate, customize, and save color palettes. 


## Installation for Backend 
* Clone down backend repo: //https://github.com/AdamN8142/wilson-picker-backend
* Dependencies: npm install 
* Start Backend: npm start

## Possible Endpoints

## GET: /api/v1/projects

Making an API call to this endpoint returns all projects.

Data returned for each project includes:

* project id
* project name
* creation timestamp
* update timestamp

#### Example of returned JSON:

    [
        {
            "id": 29,
            "project_name": "robot",
            "created_at": "2019-07-10T21:35:51.458Z",
            "updated_at": "2019-07-10T21:35:51.458Z"
        },
        {
            "id": 30,
            "project_name": "a",
            "created_at": "2019-07-10T21:36:48.909Z",
            "updated_at": "2019-07-10T21:36:48.909Z"
        }
    ]


## GET: /api/v1/projects/:id

Making an API call to this endpoint returns a project of the specified id.

Data returned for each project includes:

* project id
* project name
* creation timestamp
* update timestamp

#### Example of returned JSON:

    {
        "id": 30,
        "project_name": "a",
        "created_at": "2019-07-10T21:36:48.909Z",
        "updated_at": "2019-07-10T21:36:48.909Z"
    }
    

## GET: /api/v1/palettes

Making an API call to this endpoint returns all palettes.

Data returned for each palette includes:

* palette_name
* id
* color_1
* color_2
* color_3
* color_4
* color_5
* project_id
* creation timestamp
* update timestamp

#### Example of returned JSON:

    [
        {
            "id": 31,
            "palette_name": "ad",
            "color_1": "#60AE12",
            "color_2": "#64E3B2",
            "color_3": "#C4B69D",
            "color_4": "#6E9701",
            "color_5": "#DF57BA",
            "project_id": 113,
            "created_at": "2019-07-11T16:44:03.593Z",
            "updated_at": "2019-07-11T16:44:03.593Z"
        },
        {
            "id": 32,
            "palette_name": "asd",
            "color_1": "#16308B",
            "color_2": "#AB01E6",
            "color_3": "#0A75E1",
            "color_4": "#72D9C8",
            "color_5": "#05AD19",
            "project_id": 116,
            "created_at": "2019-07-11T16:44:28.994Z",
            "updated_at": "2019-07-11T16:44:28.994Z"
        }
    ]

## GET: /api/v1/palettes/:id

Making an API call to this endpoint returns a palette of the specified id.

Data returned for each palette includes:

* palette_name
* id
* color_1
* color_2
* color_3
* color_4
* color_5
* project_id
* creation timestamp
* update timestamp

#### Example of returned JSON:

    {
        "id": 31,
        "palette_name": "ad",
        "color_1": "#60AE12",
        "color_2": "#64E3B2",
        "color_3": "#C4B69D",
        "color_4": "#6E9701",
        "color_5": "#DF57BA",
        "project_id": 113,
        "created_at": "2019-07-11T16:44:03.593Z",
        "updated_at": "2019-07-11T16:44:03.593Z"
    }
    
  
## POST: /api/v1/projects

Making an API call to this endpoint adds a project to the projects database.

#### Required:

A correctly formatted project object must be provided in the request body in order to post to the database.

#### Example of correctly formatted project object:

`{ project_name: <STRING>  }`

`{ project_name: "Fall Colors }`

## POST: /api/v1/palettes

Making an API call to this endpoint adds a palette to the palettes database.

#### Required:

A correctly formatted palette object must be provided in the request body in order to post to the database.

#### Example of correctly formatted palette object:

     { 
       palette_name: <STRING>,
       color_1: <STRING>,
       color_2: <STRING>,
       color_3: <STRING>,
       color_4: <STRING>,
       color_5: <STRING>,
       project_id: <INTEGER> 
     }

    { 
       palette_name: "Spring Colors",
       color_1: "#324DBF",
       color_2: "#I898BC",
       color_3: "#A8D8BF",
       color_4: "#B78DEH",
       color_5: "#678A56",
       project_id: 7
     }

## DELETE /api/v1/projects/:id

Making an API call to this endpoint deletes a project with the specified id. 

#### Required:

An id that corresponds to a project present in the database must be provided in the URL.

URL with specified id:

`localhost:3001/api/v1/projects/23`

#### Possible Responses

If project not found: 

     {
        "error": "This palette does not exist. Nothing was deleted."
      }

If project is found: 

        The palette was deleted.
