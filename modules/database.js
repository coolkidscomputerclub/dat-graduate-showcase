/**
 * Dependencies
 */

var mongoose = require("mongoose"),
    _ = require("underscore"),
    $ = require("jquery-deferred");

/**
 * Database Object
 */

var database = {

    name: "degree-show",

    connect: function () {

        var connection,
            def = $.Deferred();

        mongoose.connect("mongodb://localhost/" + this.name);

        connection = mongoose.connection;

        connection.on("error", function (error) {

            console.log("Database connection error: ", error);

            def.reject(error);

        });

        connection.once("open", function () {

            def.resolve(this.name);

        });

        return def;

    },

    close: function () {

        mongoose.connection.close();

    }

};

_.bindAll(database);

module.exports = database;