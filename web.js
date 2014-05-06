
/**
 * Module dependencies.
 */

var serve = require('koa-static');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

// "database"

var comments = [{author: 'mark a woodall', text: 'working on it...'}];

// middleware

app.use(logger());

// route middleware


app.use(route.get('/comments.json', list));
app.use(route.post('/comments.json', create));
app.use(serve('.'));

// route definitions


function *list() {
    this.type = 'application/json';
    this.body = JSON.stringify(comments);
}


function *create() {
    var comment = yield parse(this);
    this.type = 'application/json';
    comments.push(comment);
    this.body = JSON.stringify(comments);
}

// listen

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});