var connect = require('connect')
var fs = require('fs')
var open = require("open")
var serveStatic = require('serve-static')
var uglifyJs = require("uglify-es")
var watch = require('node-watch')

watch('app_client', { recursive: true }, pack)

pack(null, 'start')

function pack(evt, name) {
  console.log('%s changed.', name)

    /* This will allow you to take all the JS files and compress into one file */
    var appClientFiles = {
      'spa.js': fs.readFileSync("lib/spa.js", "utf8"),
      'spa.base-model.js': fs.readFileSync("lib/spa.base-model.js", "utf8"),
      'spa.components.js': fs.readFileSync("app_client/spa.components.js", "utf8"),
      'spa.controller.js': fs.readFileSync("app_client/spa.controller.js", "utf8"),
      'spa.model.js': fs.readFileSync("app_client/spa.model.js", "utf8"),
      'spa.views.js' : fs.readFileSync("app_client/spa.views.js", "utf8")
    }

    fs.readdir('mixins', (err, filenames) => {
        if (err) {
            console.log(err)
            return
        }

        filenames.forEach((filename) => {
            appClientFiles[filename] = fs.readFileSync("mixins/"+ filename, "utf8")
        })

        var uglified = uglifyJs.minify(appClientFiles, { compress : false, keep_fnames: true, mangle: false })

        if (uglified.error) console.log(uglified.error)
        if (uglified.warnings) console.log(uglified.warnings)

        fs.writeFile('public/spa.min.js', uglified.code, (err) => {
            if(err) {
                console.log(err)
            } else {
                console.log("Script generated and saved:", 'spa.min.js')
                console.log("Refresh the page")
            }
        })

    })
}

connect().use(serveStatic(__dirname)).listen(3000, '0.0.0.0', () => {
    console.log('Server running on http://localhost:3000/')
    open('http://localhost:3000/')
})
