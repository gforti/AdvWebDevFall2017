var fs = require('fs');
var uglifyJs = require("uglify-es");

var watch = require('node-watch');


watch('app_client', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);

    /* This will allow you to take all the JS files and compress into one file */
    var appClientFiles = {
      'spa.js': fs.readFileSync("app_client/spa.js", "utf8"),
      'spa.components.js': fs.readFileSync("app_client/spa.components.js", "utf8"),
      'spa.controller.js': fs.readFileSync("app_client/spa.controller.js", "utf8"),
      'spa.model.js': fs.readFileSync("app_client/spa.model.js", "utf8"),
      'spa.views.js' : fs.readFileSync("app_client/spa.views.js", "utf8")
      };
    var uglified = uglifyJs.minify(appClientFiles, { compress : false, keep_fnames: true, mangle: false });
    
    console.log(uglified.error);   
    console.log(uglified.warnings); 

    fs.writeFile('public/spa.min.js', uglified.code, function (err){
        if(err) {
            console.log(err);
        } else {
            console.log("Script generated and saved:", 'spa.min.js');
        }
    });

});