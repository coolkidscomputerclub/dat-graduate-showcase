requirejs.config({
    paths: {
        jquery: "components/jquery/jquery",
        ga: "//www.google-analytics.com/analytics"
    },
    shim: {
        ga: {
            exports: "ga"
        }
    }
});

requirejs(["jquery", "modules/example", "modules/retinafy", "modules/analytics", "utilities/log"], function ($, example, retinafy, analytics) {

    var app = {

        Modules: {

            example: example,

            retinafy: retinafy,

            analytics: analytics

        },

        Events: $({}),

        init: function () {

            var i;

            for (i in this.Modules) {

                this.Modules[i].init(this.Events);

            }

            this.bindEvents();

        },

        bindEvents: function () {

            // bind some events

        }

    };

    $(window.document).ready(function () {

        app.init();

    });

});