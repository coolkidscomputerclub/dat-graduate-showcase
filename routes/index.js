/**
 * Dependencies
 */

var appController = require("../controllers/applicationController");

/**
 * Routes Object
 */

var routes = {

    init: function (app) {

        app.get("/", appController.index);

    }

};

module.exports = routes.init;
