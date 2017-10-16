# Project Start Guide

> Make sure to run the command that will install the dependencies

```sh
$ npm install
```

Now we can start the server with the following command to begin development

```sh
$ npm run dev
```

> About `express-validator`

https://www.npmjs.com/package/express-validator

```sh
    req.checkBody('name', 'Invalid name').isAlpha();
    req.checkBody('age', 'Invalid age').notEmpty().isInt();
    req.checkBody('ate_of_birth', 'Invalid date').isDate();

    req.sanitize('date_of_birth').toDate();
```