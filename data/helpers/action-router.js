const express = require('express');

const Actions = require('./actionModel.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get(req.query);
        res.status(200).json(actions);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the actions.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);

        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: 'Action not found.' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving the action.' });
    }
});

module.exports = router;