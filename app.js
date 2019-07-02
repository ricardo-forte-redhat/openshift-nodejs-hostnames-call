const cron = require('node-cron');
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



cron.schedule( "*/2 * * * * *" , function() {
    console.log("start running a task every minute");

    axios.all([
        axios.get( 'http://nodejs-hostname-service:8080' ),
        axios.get( 'http://python-hostname-service:8080' ),
        axios.get( 'http://php-hostname-service:8080' )
    ]).then(axios.spread((response1, response2, response3) => {
        callsResult =
            callsResult + '<br/>' +
            response1.data + '<br/>' +
            response2.data + '<br/>' +
            response3.data;
    })).catch(error => {
        console.log(error);
    });

    console.log("running a task every minute");
});