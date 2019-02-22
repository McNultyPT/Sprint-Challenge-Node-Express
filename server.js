const express = require('express');

const actionsRouter = require('./data/helpers/action-router.js');
const projectsRouter = require('./data/helpers/project-router.js');

const server = express();

server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`
        <h1>Test Message</h1>
    `);
});

module.exports = server;