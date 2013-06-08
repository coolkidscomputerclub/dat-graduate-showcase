/**
 * Dependencies
 */

  var students = require("../modules/students");

/**
 * Student Controller
 */

var studentController = {

    index: function (req, res) {

        students.getStudents().then(function (students) {

            res.render("index", {
                debugMode: debugMode,
                title: "Students",
                students: JSON.stringify(students)
            });

        });

    },

    single: function (req, res) {

        var slug = req.params.slug;

        students.getStudent({ slug: slug }).then(function (student) {

            if (student === null) {

                res.send(404);

            } else {

                res.render("index", {
                    debugMode: debugMode,
                    title: "Students",
                    student: JSON.stringify(student)
                });

            }

        });

    }

};

module.exports = studentController;