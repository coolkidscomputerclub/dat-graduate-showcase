/**
 * Dependencies
 */

var _ = require("underscore"),
    Project = require("../models/Project"),
    $ = require("jquery-deferred");

/**
 * Projects Object
 */

var projects = {

    getProjects: function () {

        var def = $.Deferred();

        Project.find(function (err, projects) {

            if (err) {

                console.log("Error getting projects: ", err);

                def.reject(err);

            } else {

                def.resolve(projects);

            }

        });

        return def;

    },

    getProject: function (params) {

        var def = $.Deferred();

        Project.findOne(params, function (err, project) {

            if (err) {

                console.log("Error getting project (id, err): ", id, err);

                def.reject(err);

            } else {

                def.resolve(project);

            }

        });

        return def;

    },

    generateId: function () {

        var self = this,
            id = "",
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
            i;

        for (i = 0; i < 5; i++) {

            id += possible.charAt(Math.floor(Math.random() * possible.length));

        }

        this.getProject(id).then(function (thisProject) {

            if (thisProject === null) {

                return id;

            } else {

                self.generateId();

            }

        });

    }

};

_.bindAll(projects);

module.exports = projects;
