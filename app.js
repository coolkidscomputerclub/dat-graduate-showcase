/**
 * Dependencies
 */

global.debugMode = false;

var express = require("express"),
    routes = require("./app/routes"),
    http = require("http"),
    path = require("path");

/**
 * App
 */

var app = express(),
    port = 8080;

app.configure(function () {

    app.set("port", process.env.PORT || port);

    app.set("views", path.join(__dirname, "app/views"));

    app.set("view engine", "jade");

    app.use(express.favicon());

    app.use(express.logger("dev"));

    app.use(express.bodyParser());

    app.use(express.methodOverride());

    app.use(app.router);

    app.use(express.static(path.join(__dirname, "public")));

});

app.configure("development", function () {

    app.use(express.errorHandler());

});

// init routes
routes(app);

http.createServer(app).listen(app.get("port"), function () {

    console.log("Express server listening on port " + app.get("port"));

});
