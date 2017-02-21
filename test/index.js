'use strict';

const Hapi              = require('hapi');
const server            = new Hapi.Server();
const db                = require('./models');
const HSCrud            = require('./../dist/crud');
const hsCrud            = new HSCrud(server);

server.connection({
    host: 'localhost',
    port: 8000
});

server.route(hsCrud.get(db.User, null, ['withCategory']));
server.route(hsCrud.list(db.User, null, ['withCategory']));
server.route(hsCrud.create(db.User, null));
server.route(hsCrud.update(db.User, null));
server.route(hsCrud.destroy(db.User, null));

server.route(hsCrud.get(db.Category, null, ['withUsers']));
server.route(hsCrud.list(db.Category, null, ['withUsers']));
server.route(hsCrud.create(db.Category, null));
server.route(hsCrud.update(db.Category, null));
server.route(hsCrud.destroy(db.Category, null));


server.start(() => {
    console.log('Server is running at: ', server.info.uri);
});