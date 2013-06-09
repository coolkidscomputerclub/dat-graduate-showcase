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

requirejs(["jquery", "modules/sequence", "modules/retinafy", "modules/analytics", "utilities/log"], function ($, sequence, retinafy, analytics) {

    var app = {

        Modules: {

            sequence: sequence,

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