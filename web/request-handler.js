var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {


  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(archive.paths.index, (err, data) => {
        if (err) { throw err; }
        res.writeHead(200, helpers.headers);
        res.write(data);
        res.end(); 
      });    
    } else {    
      fs.readFile(archive.paths.archivedSites + req.url, (err, data) => {
        if (err) {
          fs.readFile(archive.paths.loading, (err, data) => {
            if (err) { throw err; }
            res.writeHead(404, helpers.headers);
            res.write(data);
            res.end();
          });        
        } else {
          res.writeHead(200, helpers.headers);
          res.write(data);
          res.end();        
          
        }
        
      });       
    }    
  }

  
  if (req.method === 'POST') {
    var requestURL = '';
    req.on('data', function(chunk) {
      requestURL += chunk;
    }).on('end', function() {
      
      requestURL = requestURL.slice(4);
      
      fs.readFile(archive.paths.archivedSites + '/' + requestURL, (err, data) => {
        if (err) {
          fs.readFile(archive.paths.loading, (err, data) => {
            if (err) { throw err; }
            
            archive.addUrlToList(requestURL, function() {
              res.writeHead(302, helpers.headers);
              res.end();
              
            });
            res.writeHead(404, helpers.headers);
            res.write(data);
            res.end();
          } );         
        } else {
          res.writeHead(302, helpers.headers);
          res.write(data);
          res.end();         
        }
      });
      
      
      
      // if(archive.isUrlInList(requestURL, ))
      
      
      //       exports.isUrlInList = function(url, callback) {
      //   this.readListOfUrls(function(list) {
      //     callback(list.includes(url));
      //   })  
      // };
      
      

    });     
    
  }

};


// exports.headers = {
//   'access-control-allow-origin': '*',
//   'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'access-control-allow-headers': 'content-type, accept',
//   'access-control-max-age': 10, // Seconds.
//   'Content-Type': 'text/html'
// };