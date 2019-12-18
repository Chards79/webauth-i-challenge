const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const apiRouter = require('./api-router');
const knex = require('../data/dbConfig');

const server = express();

const sessionConfiguration = {
    name: 'snickerdoodle',
    secret: 'keep it secret, keep it safe',
    saveUninitialized: true,
    resave: false,

    // store session
    store: new KnexSessionStore({
        knex,
        tablename: 'session',
        createTable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 10,
    }),

    // cookie options
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    }
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfiguration));

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up and running' });
});

module.exports = server;