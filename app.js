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


// app = express();

cron.schedule("* * * * *", function() {
    console.log("start running a task every minute");

    const options = {
        hostname: 'nodejs-hostname-service',
        port: 8080,
        path: '/',
        method: 'GET'
    }

    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
        console.error(error)
    })

    req.end()

    console.log("running a task every minute");
});