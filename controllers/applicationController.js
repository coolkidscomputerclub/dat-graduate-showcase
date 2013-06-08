/**
 * Dependencies
 */

 

/**
 * Application Controller
 */

var applicationController = {

    index: function (req, res) {

        res.render("index", {
            title: "Express",
            debug: debugMode
        });

    }

};

module.exports = applicationController;