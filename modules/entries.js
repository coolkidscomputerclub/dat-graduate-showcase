/**
 * Dependencies
 */

var Entry = require("../models/Entry"),
    helpers = require("./helpers"),
    _ = require("underscore"),
    $ = require("jquery-deferred");

/**
 * Entries Object
 */

var entries = {

    getEntries: function (query, fields) {

        var def = $.Deferred();

        query = query || {};

        fields = fields || "student project";

        console.log("Getting entries: ", query, fields);

        Entry.find(query, fields, function (err, entries) {

            if (err) {

                console.log("Error getting entries: ", err);

                def.reject(err);

            } else {

                helpers.randomise(entries);

                def.resolve(entries);

            }

        });

        return def;

    },

    getEntry: function (query, fields) {

        var def = $.Deferred();

        query = query || {};

        fields = fields || "student project";

        console.log("Getting entry: ", query, fields);

        Entry.findOne(query, fields, function (err, entry) {

            if (err) {

                console.log("Error getting entry (id, err): ", id, err);

                def.reject(err);

            } else {

                def.resolve(entry);

            }

        });

        return def;

    },

    addEntries: function (data) {

        var def = $.Deferred(),
            defs = [],
            i,
            j,
            slug;

        for (i = 0, j = data.length; i < j; i++) {

            data[i].student.slug = helpers.toSlug(data[i].student.name);

            data[i].student.profileImage = "/img/" + data[i].student.slug + ".jpg";

            slug = data[i].project.slug = helpers.toSlug(data[i].project.title);

            data[i].project.images = {
                gallery: "/img/" + slug + "-gallery.jpg",
                featured: "/img/" + slug + "-featured.jpg",
                sequence: "/img/" + slug + "-sequence.jpg"
            };

            console.log("Upserting: ", data[i]);

            defs.push(this.addEntry(data[i]));

        }

        $.when.apply(null, defs).then(function () {

            console.log("Entries added: ", arguments);

            def.resolve();

        });

        return def;

    },

    addEntry: function (data) {

        var def = $.Deferred(),
            query = { "student.slug": data.student.slug };

        console.log("Add query: ", query);

        Entry.findOneAndUpdate(query, data, { upsert: true }, function (err, entry) {

            if (err) {

                console.log("Error adding entry: ", err);

                def.reject(err);

            } else {

                def.resolve(entry);

            }

        });

        return def;

    }

};

_.bindAll(entries);

module.exports = entries;
