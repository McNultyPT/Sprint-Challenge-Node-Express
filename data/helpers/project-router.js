const express = require('express');

const Projects = require('./projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get(req.query);
        res.status(200).json(projects);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'The projects could not be retrieved.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ errorMessage: 'A project with that ID does not exist.' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'The project could not be retrieved.' });
    }
});

module.exports = router;