# Project Start Guide

> Make sure to run the command that will install the dependencies

```sh
$ npm install
```

### Before you can run the project make sure mongoDB database is up and running

Now we can start the server with the following command to begin development

```sh
$ npm run dev
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