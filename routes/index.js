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

        // standard gets

        app.get("/", projectController.index);

        app.get("/projects/:slug?", projectController.single);

        app.get("/students", studentController.index);

        app.get("/students/:slug?", studentController.single);

        // CMS posts

        app.post("/projects/add", projectController.addProjects);

        app.post("/projects/edit", projectController.editProjects);

        app.post("/students/add", studentController.addStudents);

        app.post("/students/edit", studentController.editStudents);

    }

};

module.exports = routes.init;
