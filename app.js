const cron = require('node-cron');
const express = require('express');
// const fs = require('fs');
const http = require('http');
const https = require('https');

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let body =
        '<html>\n' +
        '    <head>\n' +
        '        <title>NodeJs Hello World!</title>\n' +
        '    </head>\n' +
        '    <body>\n' +
        '        <h3>NodeJs Hello World!</h3>\n' +
        '        <br/>\n' +
        '        My hostname is ';

    body = body + process.env.HOSTNAME;

    body = body + '   </body>\n' + '</html>';

    res.end( body );
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


app = express();

cron.schedule("* * * * *", function() {
    console.log("start running a task every minute");

    http.get('http://nodejs-hostname-service:8080', (resp) => {
        console.log("calling http://nodejs-hostname-service");

        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(data);
        });

        console.log(data);

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    console.log("running a task every minute");
});