var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var requestURL = "";
  if (req.method === 'GET') {
       
    if(!requestURL.length) {
      
      fs.readFile(archive.paths.list, (err, data) => {
        if(err) throw err;
        // console.log(data.toString().includes(requestURL));
        if(data.toString().includes(requestURL)) {
          fs.readFile(archive.paths.archivedSites + '/' +requestURL, (err, data) => {
            // if(err) throw err;
            console.log(archive.paths.archivedSites + '/' +requestURL);
            console.log(data, '============================================================================');
            res.writeHead(200, helpers.headers);
            res.write(data);
            res.end();
          })
        }
    
      })
      
    } else {      
      fs.readFile(archive.paths.index, (err, data) => {
        if(err) throw err;
        res.writeHead(200, helpers.headers);
        res.write(data);
        res.end(); 
      })
    }
  }
    

  if (req.method === 'POST') {
    req.on('data', function(chunk) {
      requestURL+=chunk;
    });
    req.on('end', function() {
      requestURL = requestURL.slice(8, requestURL.length-4);
      console.log(requestURL, '<=======================================================================');
      res.writeHead(200, helpers.headers);
      res.end(); 
    })     
  } 
  // res.end(archive.paths.list);
};


// exports.headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
//   'Content-Type': 'text/html'
// };