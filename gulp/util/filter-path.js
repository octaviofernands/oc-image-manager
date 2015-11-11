module.exports = function(file){
  var relativePath = file.path.split('src')[1];
  if (relativePath.match(/_.+/gi)) return file;
}