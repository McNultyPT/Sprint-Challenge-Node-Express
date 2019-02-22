const express = require('express');

const Actions = require('./actionModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get(req.query);
        res.status(200).json(actions);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving the actions.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);

        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ errorMessage: 'An action with that ID does not exist.' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Error retrieving the action.' });
    }
});

router.post('/', async (req, res) => {
    const actionInfo = req.body;

    if (!actionInfo.project_id || !actionInfo.description || !actionInfo.notes)
        return res.status(400).json({ errorMessage: 'Please provide a description, notes and a project ID.' });

    try {
        const action = await Actions.insert(actionInfo);
        res.status(201).json(action);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'There was an error while saving this action.' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = await Actions.remove(req.params.id);

    try {
        if (id) {
            res.status(204).end();
        } else {
            res.status(404).json({ errorMessage: 'An action with that ID does not exist.' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'The action could not be removed.' });
    }
});

module.exports = router;