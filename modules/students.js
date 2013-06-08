/**
 * Dependencies
 */

var _ = require("underscore"),
    Student = require("../models/Student"),
    $ = require("jquery-deferred");

/**
 * Students Object
 */

var students = {

    getStudents: function () {

        var def = $.Deferred();

        Student.find(function (err, students) {

            if (err) {

                console.log("Error getting students: ", err);

                def.reject(err);

            } else {

                def.resolve(students);

            }

        });

        return def;

    },

    getStudent: function (params) {

        var def = $.Deferred();

        Student.findOne(params, function (err, student) {

            if (err) {

                console.log("Error getting student (id, err): ", id, err);

                def.reject(err);

            } else {

                def.resolve(student);

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

        this.getStudent(id).then(function (thisStudent) {

            if (thisStudent === null) {

                return id;

            } else {

                self.generateId();

            }

        });

    }

};

_.bindAll(students);

module.exports = students;
