var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  index: path.join(__dirname, '../web/public/index.html'),
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  loading: path.join(__dirname, '../web/public/loading.html')
  
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, (err, data) => {
    if(err) throw err;  
    // data.toString().split('\n').pop();
    // console.log('Data before pop ', data.toString().split('\n'));
    // console.log('Popped ', data.toString().split('\n').pop());
    // console.log('What is data now? ', data.toString());
    var urls = data.toString().split('\n');
    urls.pop()
    callback(urls);
  })
};


exports.isUrlInList = function(url, callback) {
  this.readListOfUrls(function(list) {
    callback(list.includes(url));
  })  
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(this.paths.list, url + '\n', (err) => {
    if(err) throw err;
    callback();
  })
};



exports.isUrlArchived = function(url, callback) {
  fs.readdir(this.paths.archivedSites, function(err, items) {
    if(err) throw err;
    callback(items.includes(url));
  })
};



exports.downloadUrls = function(urls) {
   _.each(urls, function(url){
    http.get('http://' + url, (res) => {
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      }).on('end', function() {

        console.log(url);
        fs.writeFile(exports.paths.archivedSites + '/' + url, data, (err) => {
          if(err) throw err;
        })
      })
    }).on('error', (err) => {
      console.log('Need to fix????')
      // console.log('error');
    })
   })
  
  //urls is an array.
};

