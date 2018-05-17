var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  //reading sites.txt file
  //return an array of sites
  return callback(paths.list.bind(this), (err, data) =>{
    if(err) throw err;
    return data.split('/n');
  }) 
};


// fs.readFile(archive.paths.archivedSites + '/' +requestURL, (err, data) => {
// // if(err) throw err;
// console.log(archive.paths.archivedSites + '/' +requestURL);
// console.log(data, '=================================================================');
// res.writeHead(200, helpers.headers);
// res.write(data);
// res.end();

exports.isUrlInList = function(url, callback) {
  
};

exports.addUrlToList = function(url, callback) {
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
  //urls is an array.
};

