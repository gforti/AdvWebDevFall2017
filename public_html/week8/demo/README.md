# Project Start Guide

> Make sure to run the command that will install the dependencies

```sh
$ npm install
```

### Before you can run the project make sure mongoDB database is up and running

## Create a **.env** file in the root folder with the following text inside

```sh
JWT_SECRET=thisIsASecretString
```

Now we can start the server with the following command to begin development

```sh
$ npm run dev:pc
```
or
```sh
$ npm run dev:mac
```

> Run `proxy-demo.html` as it's own page, it is not part of the express project