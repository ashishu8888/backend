//sever creation

//1. http module

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('request has been made from browser to server.');
    // console.log(req.method);
    // console.log(req.url);
   // console.log(req);
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello, Ashish!')
    // res.end();
    res.setHeader('Content-Type', 'text/html')
    // res.write('<h3> hello , ashu</h3>');
    // res.end();

    //node.js file system

    let path = 'C:\\Users\\au224\\Desktop\\server\\views';

    console.log(path);

    switch (req.url)
    {
        
        case '/':
            path += '/index.html';
            res.statusCode = 200; // implementing status code...
            break;
        
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        
        // redirct..
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        
        default:
            path += '/404.html';
            res.statusCode = 404;
    }


    fs.readFile(path, (err, fileData) => {
        if (err)
        {
            console.log(err);
        }
        else 
        {
            res.write(fileData);   
            res.end();
            // if there is single a res.write() then we can aslo do like this
            //res.end(fiileData)
        }
    });


});

// port number, host, callback func

server.listen(3000, 'localhost', () => {
    console.log('server is listening on port 3000');
});