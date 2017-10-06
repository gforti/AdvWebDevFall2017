# Week 2 How To Guide

Start by opening the portable node.js console then enter this command. (without the $)

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

### Difference between Morgan and Debug

| Morgan | Debug |
| ------ | ------ |
| It is for automated logging of requests, responses and related data. | works more like console.log but uses std error (stderr) to output messages. |

```sh
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```

### To make changes and have the server reset on the fly we will use nodemon (node monitor)

in the demo directory enter
```sh
$ npm install nodemon --save
```

in the package.json lets add this to the scripts

```sh
"dev": "SET DEBUG=demo:* & nodemon ./bin/www"
```

```sh
$ npm run dev
```
"nodemonConfig": {
"verbose": true,
"ignore": ["public/*"]
}

 
| Request Method | Info |
| ------ | ------ |
| req.query | get url information |
| req.method | method used to contact page |
| req.body | form information |

 