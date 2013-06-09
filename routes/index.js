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

        app.get("/", applicationController.index);

        app.get("/:model(projects|students)/:slug?", applicationController.single);

        // CMS posts

        app.post("/entries/add", applicationController.add);

    }

};

module.exports = routes.init;
