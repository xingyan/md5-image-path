var util = require('g-file');
var md5 = require('blueimp-md5').md5;

module.exports = function(opts) {
  if(!opts.files) throw new Error('Need path in module md5-image-path');
  var filesList = [];
  if((typeof opts.files).toLocaleLowerCase() == 'string') {
    var path = getMd5Path(opts.files);
    filesList.push({
      file: opts.files,
      md5: path
    });
  } else if(Array.isArray(opts.files)) {
    opts.files.forEach(function(item) {
      var path = getMd5Path(item);
      filesList.push({
        file: item,
        md5: path
      });
    });
  }
  return filesList;
}

/**
 * @desc 获得路径的md5
 */
function getMd5Path(str) {
  if(util.isFile(str)) {
    return md5(str);
  }
  return null;
}