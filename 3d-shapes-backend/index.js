import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import utils from './utils.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const port = process.env.PORT || 5000;


wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
});
  
const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        const {w, h, r, hc} = utils.randomWidthHeightGenerator();
        const data = JSON.stringify({w, h, r, hc})
        console.log({w, h, r, hc});

        ws.send(data);
        
    });
}, 15000);
  
wss.on('close', function close() {
    clearInterval(interval);
});



app.get('/', (req, res) => {
    res.send('Welcome to express server!');
});

server.listen(port, () => console.log('listening on port ' + port));
