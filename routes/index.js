/**
 * Dependencies
 */

var applicationController = require("../controllers/applicationController");

/**
 * Routes Object
 */

var routes = {

    init: function (app) {

        // standard gets

        app.get("/", applicationController.projects);

        app.get("/students?", applicationController.students);

        app.get("/projects/:slug?", applicationController.project);

        app.get("/students/:slug?", applicationController.student);

        // CMS posts

        app.post("/entries/add", applicationController.add);

    }

};

module.exports = routes.init;
