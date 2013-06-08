/**
 * Dependencies
 */

var studentController = require("../controllers/studentController"),
    projectController = require("../controllers/projectController");

/**
 * Routes Object
 */

var routes = {

    init: function (app) {

        app.get("/", projectController.index);

        app.get("/projects/:slug?", projectController.single);

        app.get("/students", studentController.index);

        app.get("/students/:slug?", studentController.single);

    }

};

module.exports = routes.init;
