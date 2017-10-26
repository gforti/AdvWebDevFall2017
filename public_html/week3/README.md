# Project Start Guide for Express

> Skip and go to `Start Here` if `express-generator` is already installed

Start by opening the portable node.js console then enter this command. (`without the $`)

```sh
$ npm install express-generator -g
```

> This will install the express generator globally.

## Start Here

> ### Remember to change `folder-name` with the correct one

At the root folder enter this command.

```sh
$ express --view=pug folder-name
```

> #### If you want to use a preprocesser for `CSS` like `SaSS` use the following command instead.

```sh
$ express --view=pug --css=sass folder-name
```

> Make sure to run the command that will install the dependencies

```sh
$ cd folder-name && npm install
```

### To make changes without having to reset the server we will use `nodemon` (node monitor)

In the `[folder-name]` directory enter
```sh
$ npm install nodemon --save-dev
```

in the `package.json` lets add this to the scripts json

```js
"dev": "SET DEBUG=folder-name:* & nodemon ./bin/www"
```
Now we can start the server with the following command to begin development

```sh
$ npm run dev
```
