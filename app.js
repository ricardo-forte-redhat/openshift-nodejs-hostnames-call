const cron = require('node-cron');
const express = require('express');
const http = require('http');

let callsResult = '';

const hostname = '0.0.0.0';
const port = 8080;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let body =
        '<html>\n' +
        '    <head>\n' +
        '        <title>Hostnames</title>\n' +
        '    </head>\n' +
        '    <body>\n' +
        '        <h3>Calling hostname services</h3>\n' +
        '        <br/>' +
                 callsResult +
        '   </body>\n' +
        '</html>';

    res.end( body );
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


app = express();

cron.schedule("* * * * *", function() {
    console.log("start running a task every minute");

    http.get('http://nodejs-hostname-service:8080', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            callsResult = callsResult + '<br/>' + data;
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    // http.get('http://php-hostname-service:8080', (resp) => {
    //     let data = '';
    //
    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });
    //
    //     // The whole response has been received. Print out the result.
    //     resp.on('end', () => {
    //         console.log(data);
    //     });
    //
    //     console.log(data);
    //
    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
    //
    // http.get('http://python-hostname-service:8080', (resp) => {
    //     let data = '';
    //
    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });
    //
    //     // The whole response has been received. Print out the result.
    //     resp.on('end', () => {
    //         console.log(data);
    //     });
    //
    //     console.log(data);
    //
    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
    //
    console.log("running a task every minute");
});