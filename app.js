const cron = require('node-cron');
const express = require('express');
const http = require('http');
const axios = require('axios');


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

cron.schedule( "* * * * *" , function() {

    console.log("start running a task every minute");

    axios.all([
        axios.get('http://nodejs-hostname-service:8080'),
        axios.get('http://python-hostname-service:8080'),
        axios.get('http://php-hostname-service:8080')
    ]).then(axios.spread((response1, response2, response3) => {
        callsResult = callsResult + '<br/>' + response1.data;
        callsResult = callsResult + '<br/>' + response2.data;
        callsResult = callsResult + '<br/>' + response3.data;

        console.log(response1.data.url);
        console.log(response2.data.body);
    })).catch(error => {
        console.log(error);
    });






    // http.get('http://nodejs-hostname-service:8080', (resp) => {
    //     let data = '';
    //
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });
    //
    //     resp.on('end', () => {
    //         callsResult = callsResult + '<br/>' + data;
    //     });
    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
    //
    // http.get('http://php-hostname-service:8080', (resp) => {
    //     let data = '';
    //
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });
    //
    //     resp.on('end', () => {
    //         callsResult = callsResult + '<br/>' + data;
    //     });
    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
    //
    // http.get('http://python-hostname-service:8080', (resp) => {
    //     let data = '';
    //
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });
    //
    //     resp.on('end', () => {
    //         callsResult = callsResult + '<br/>' + data;
    //     });
    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });

    console.log("running a task every minute");
});