"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/main.js",
                    name: "main",
                    include: ["components/requirejs/require.js"],
                    out: "public/js/main.min.js"
                }
            }
        },
        sass: {
            compile: {
                options: {
                    style: "compressed",
                    cacheLocation: "public/css/sass/.sass-cache"
                },
                files: {
                    "public/css/main.css": "public/css/sass/main.scss"
                }
            }
        },
        watch: {
            sass: {
                files: "public/css/sass/**/*.scss",
                options: {
                    livereload: true
                },
                tasks: ["sass"]
            }
        },
        jshint: {
            all: ["public/js/main.js", "public/js/modules/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        }
    });

    // load tasks
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("build", ["jshint", "sass", "requirejs"]);

};
