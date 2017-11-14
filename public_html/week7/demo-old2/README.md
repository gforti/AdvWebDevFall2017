# Project Start Guide

> Make sure to run the command that will install the dependencies

```sh
$ npm install
```

Now we can start the server with the following command to begin development

```sh
$ npm start
```

All changes made in `app_client` will picked up and update the `spa.min.js` file.

> `index.html` will run a on `http://localhost:3000/`


### Testing localhost on your mobile device

This application connects on `0.0.0.0` which will resolve to localhost based on your network IP address.

On a windows prompt you should be able to check your network IP address with

```sh
$ ipconfig
```

The following IP address with `:3000` as the host should give you access on your mobile device

```sh
IPv4 Address. . . . . . . . . . . : 192.x.x.x
```

`192.x.x.x:3000` should be entered 

> Firewalls could block this from working
