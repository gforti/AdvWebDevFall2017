# Project Start Guide

> Make sure to run the command that will install the dependencies

```sh
$ npm install
```

### Before you can run the project make sure mongoDB database is up and running

Now we can start the server with the following command to begin development

```sh
$ npm run dev:pc
```
or
```sh
$ npm run dev:mac
```

## Install Express Debug

https://www.npmjs.com/package/express-debug


```sh
$ npm install express-debug --save-dev
```

In the code `app.js` add this before `module.exports = app;`

```js
  ...
  res.status(err.status || 500);
  res.render('error');
});

require('express-debug')(app);

module.exports = app;
```

## Note about dates with `MongoDB`

If you store a string such as `2018-10-01` it will instead store `2018-09-30` due to not adding the time.  
Since the time value will default to midnight we need to add the time zone to the date to correct this issue. 

```js
new Date('2018-10-01 EST');
```

```js
new Date(req.body.startDate + ' EST');
```