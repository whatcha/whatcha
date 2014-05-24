
/**
 * Module dependencies.
 */

var serve = require('koa-static');
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = koa();

// middleware

app.use(logger());

// route middleware

app.use(serve('.'));

// route definitions


// listen

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
