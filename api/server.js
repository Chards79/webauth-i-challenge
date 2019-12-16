const express = require('express');
const helmet = require('helmet');
const server = express();
const db = require('../data/dbConfig');

const usersRouter = require('../routers/users-router');

server.use(helmet());
server.use(express.json());
server.use('/api/routers/users', usersRouter);
server.use('/api/routers', db);

module.exports = server;
