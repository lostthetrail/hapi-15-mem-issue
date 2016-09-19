'use strict';

const Hapi = require('hapi');
const hoek = require('hoek');

const server = new Hapi.Server({
    connections: {
        router: {
            stripTrailingSlash: true
        }
    }
});

server.connection({
    port: process.env.NODE_PORT || 8080,
    host: process.env.HOSTNAME || '0.0.0.0',
    routes: {
        response: {
            emptyStatusCode: 204
        }
    }
});

server.route([
    {
        method: 'GET',
        path: '/validate',
        handler: function handle(request, reply) {
            return reply({
                validate: true
            });
        }
    }
]);

server.start(function handleServerStart(serverStartErr) {
    hoek.assert(!serverStartErr, serverStartErr);
    console.log(`Server running at: ${server.info.uri}`);
});
