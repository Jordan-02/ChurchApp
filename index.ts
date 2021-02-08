/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as Express from 'express';

const app = Express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./router');

const port = process.env.PORT || 5000;

app.use(router);
io.on('connection', (socket: any) => {
    console.log('User has connected!');

    socket.on('join', ({ username, password }) => {
        console.log(username, password);
        io.emit('join', { username, password });
    });

    socket.on('disconnect', () => {
        console.log('User has disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
