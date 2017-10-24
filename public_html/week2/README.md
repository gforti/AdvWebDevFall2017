# Week 2 How To Guide

Start by opening the portable node.js console then enter this command. (`without the $`)

```sh
$ npm install express-generator -g
```

> This will install the express generator globally.


To see a list of packages installed globally use this command.

```sh
$ npm -g ls --depth=0
```

Under your week2 folder at the root enter this command.

```sh
$ express --view=pug demo
```

> This will create an express application with the view engine pug in a folder called demo

> #### If you want to use a preprocesser for `CSS` like `SaSS` use the following command instead.

```sh
express --view=pug --css=sass demo
```

You will see the following output
```sh
create : demo
create : demo/package.json
create : demo/app.js
create : demo/public
create : demo/routes
create : demo/routes/index.js
create : demo/routes/users.js
create : demo/views
create : demo/views/index.pug
create : demo/views/layout.pug
create : demo/views/error.pug
create : demo/bin
create : demo/bin/www
create : demo/public/javascripts
create : demo/public/images
create : demo/public/stylesheets
create : demo/public/stylesheets/style.css

install dependencies:
> cd demo && npm install

run the app:
> SET DEBUG=demo:* & npm start

install the dependencies entering the command 
- cd demo && npm install
```
> Make sure to run the command that will install the dependencies

```sh
$ cd demo && npm install
```

### To make changes without having to reset the server we will use `nodemon` (node monitor)

In the `demo` directory enter
```sh
$ npm install nodemon --save-dev
```

> The `--save` will update the `package.json` file with the install module.  Adding `-dev` will save it as a development dependency which is not for production use.

in the `package.json` lets add this to the scripts json

```sh
"dev:pc": "SET DEBUG=demo:* & nodemon ./bin/www",
"dev:mac": "DEBUG=demo:* nodemon ./bin/www"
```
Now we can start the server with the following command to begin development

```sh
$ npm run dev:pc
```
or
```sh
$ npm run dev:mac
```
> If you wanted to configure more options for `nodemon` you can add the following config to the  `package.json ` file.

```js
"nodemonConfig": {
  "verbose": true,
  "ignore": ["public/*"]
}
```

#### public\stylesheets\style.css
> Update the `body` tag to see nodemon picup the changes
```css
background-color: #d9edf7;
```

### Difference between Morgan and Debug

| Morgan | Debug |
| ------ | ------ |
| It is for automated logging of requests, responses and related data. | works more like console.log but uses std error (stderr) to output messages. |

### Middleware
```js
// set the app to auto log request and response values
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// a middleware function with no mount path. This code is executed for every request to the router
app.use(function (req, res, next) {
  debug('Time:', Date.now());
  next();
});
```

> The idea of middleware in express is to update the request and responses as you see fit
 
### Working with route data
| Request Method | Info |
| ------ | ------ |
| req.query | get url information |
| req.method | method used to contact page |
| req.body | form information |

 
 ### Add to the following file(s)
 
 #### views\form.pug
 ```html
 extends layout

block content
 h1=title
 p
    a(href="./") Index
 h2=message
 form.form-horizontal(action="/form", method="post", role="form")
        .form-group
          label.control-label(for="name") Author         
            input#name.form-control(name="author")        
        input(type="submit" value="Submit")
```
#### views\results.pug
```html
extends layout

block content
    h1=title
    p
        strong #{author}
    p
        a(href="./form") Back
```
### Update the following file(s)

#### routes\index.js
> Add the following code
```js
router.get('/form', function(req, res, next) {
    
    var msg = '';
    if (req.query.empty === 'true') {
        msg = 'Please enter a value';
    }
  res.render('form', { title: 'Form Page', message: msg });
}).post('/form', function(req, res, next) {
   if (req.method === 'POST' && req.body.author.length) {
       
        next();
        
    } else {
       res.render('form', { title: 'Form Page', message: 'Please enter a value' });
    }   
}).post('/form', function(req, res, next) {
   if (req.method === 'POST' && req.body.author.length) {
       res.render('results', { 
            title : 'Form Post Page',
            author: req.body.author
        });   
        
    } else {
        res.redirect('/form?empty=true');
      
    }   
});
```

