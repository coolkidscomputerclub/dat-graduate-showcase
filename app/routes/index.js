/**
 * Dependencies
 */

var main = require("../controllers");

/**
 * Routes Object
 */

var routes = {

    init: function (app) {

        // standard gets

        app.get("/", main.projects);

        app.get("/students?", main.students);

        app.get("/projects/:slug?", main.project);

        // single pages

        app.get("/event?", main.event);

    }

};

module.exports = routes.init;
