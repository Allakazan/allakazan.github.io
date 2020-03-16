---
title: Running your NodeJs app as a service
layout: post
subtitle: How to use the systemd to deploy your NodeJs applications
thumbnail: https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&h=800&q=80
tags:
- nodejs
- deploy
- unix
- systemd
---

You spent some time making your node app and now you need to deploy locally, or on a server.  How to keep track of your app *status* ?

The best known solution is the **systemd**, the UNIX default service manager.
### Node Application:

In this app we will be using express, so if you want follow the node app, please run:

<span>`npm install express --save`</span>

Let's create our node app first:

``` javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Node Js App!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

Now just run your node app and open the url: **localhost:3000** in your browser.

### Unix Service:

First create a file named **your-node-app.service** inside `/etc/systemd/system/`, then copy the text below to your file:

<script src="https://gist.github.com/Allakazan/99a70ebda585d3c94a8230c9fe332d2f.js"></script>

Run <span>`systemctl daemon-reload`</span> to reload the service files. Then use  <span>`systemctl start your-node-app`</span>

You can run too <span>`systemctl status your-node-app`</span> to check your application status.

And is *done*, your app is running as a unix service.
