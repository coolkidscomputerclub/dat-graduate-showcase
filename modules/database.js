/**
 * Dependencies
 */

var mongoose = require("mongoose"),
    $ = require("jquery-deferred");

/**
 * Database Object
 */

var database = {

    connect: function () {

        var connection,
            def = $.Deferred();

        mongoose.connect("mongodb://localhost/degree-show");

        connection = mongoose.connection;

        connection.on("error", this.error);

        connection.once("open", function () {

            def.resolve();

        });

        return def;

    },

    error: function (error) {

        console.log("Database connection error: ", error);

    },

    close: function () {

        mongoose.connection.close();

    }

};

module.exports = database;