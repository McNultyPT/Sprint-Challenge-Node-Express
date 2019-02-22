const express = require('express');

const Projects = require('./projectModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.get();
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

router.post('/', async (req, res) => {
    const projectInfo = req.body;

    if (!projectInfo.name || !projectInfo.description)
        return res.status(400).json({ message: 'Please provide a name and description.' });

    try {
        const project = await Projects.insert(projectInfo);
        res.status(201).json(project);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'There was an error while saving this project.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = await Projects.remove(req.params.id);

    try {
        if (id) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'A project with that ID does not exist.' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'The project could not be removed.' });
    }
});

module.exports = router;