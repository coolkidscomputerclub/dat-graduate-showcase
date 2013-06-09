/**
 * Dependencies
 */

var entries = require("../modules/entries"),
    config = require("../config");

/**
 * Entrie Controller
 */

var entryController = {

    index: function (req, res) {

        entries.getEntries().then(function (entries) {

            res.render("index", {
                debugMode: debugMode,
                title: "Entries",
                entries: JSON.stringify(entries)
            });

        });

    },

    single: function (req, res) {

        var model = req.params.model,
            slug = req.params.slug;

        query = (model === "students") ? { "student.slug": slug } : { "project.slug":  slug } ;

        console.log("Query: ", query);

        entries.getEntry(query).then(function (entry) {

            if (entry === null) {

                res.send(404);

            } else {

                res.render("index", {
                    debugMode: debugMode,
                    title: "Entry",
                    entry: JSON.stringify(entry)
                });

            }

        });

    },

    add: function (req, res) {

        console.log("Add entries req: ", req.body.entries);

        if (req.body.apiKey === config.apiKey) {

            entries.addEntries(req.body.entries).then(function () {

                res.send(200);

            });

        } else {

            res.send(401);

        }

    }

};

module.exports = entryController;