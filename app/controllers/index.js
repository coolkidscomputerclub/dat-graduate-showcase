/**
 * Dependencies
 */

var find = require('lodash.find');
var shuffle = require('lodash.shuffle');
var entries = require("../../entries.json").entries;

/**
 * Main Controller
 */

var main = {

    projects: function (req, res) {

        return res.render("projects", {
            debugMode: debugMode,
            year: (new Date()).getUTCFullYear(),
            title: "Projects",
            view: "page-projects",
            entries: shuffle(entries)
        });

    },

    students: function (req, res) {

        return res.render("students", {
            debugMode: debugMode,
            year: (new Date()).getUTCFullYear(),
            title: "Students",
            view: "page-students",
            entries: shuffle(entries)
        });

    },

    project: function (req, res) {

        var slug = req.params.slug,
            query = function (entry) {
                return entry.project.slug === slug;
            },
            entry = find(entries, query);

        if (entry === undefined) {

            return res.send(404);

        }

        return res.render("project", {
            debugMode: debugMode,
            year: (new Date()).getUTCFullYear(),
            title: entry.project.title + " | " + entry.student.name,
            view: "page-project",
            entry: entry
        });

    },

    event: function (req, res) {

        return res.render("event", {
            debugMode: debugMode,
            year: (new Date()).getUTCFullYear(),
            title: "Event",
            view: "page-event"
        });

    }

};

module.exports = main;
