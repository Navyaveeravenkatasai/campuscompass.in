const http = require('http');
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const port = 5000; // Change this to the desired port number
const filePath = path.join(__dirname, 'Home.html'); // Change 'index.html' to the name of your HTML file

gulp.task('build', () => {
    // Add your build tasks here
    // For example, you can minify CSS, concatenate JS files, etc.
    console.log('Building...');
});

const server = http.createServer((req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
