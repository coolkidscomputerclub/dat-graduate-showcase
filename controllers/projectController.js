/**
 * Dependencies
 */

 var projects = require("../modules/projects");

/**
 * Project Controller
 */

var projectController = {

    index: function (req, res) {

        projects.getProjects().then(function (projects) {

            res.render("projects", {
                debugMode: debugMode,
                title: "Projects",
                projects: JSON.stringify(projects)
            });

        });

    },

    single: function (req, res) {

        var slug = req.params.slug;

        projects.getProject({ slug: slug }).then(function (project) {

            if (project === null) {

                res.send(404);

            } else {

                res.render("index", {
                    debugMode: debugMode,
                    title: "Projects",
                    project: project
                });

            }

        });

    }

};

module.exports = projectController;
