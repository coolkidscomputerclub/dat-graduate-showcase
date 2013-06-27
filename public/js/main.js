requirejs.config({
    paths: {
        jquery: "components/jquery/jquery",
        fitvids: "components/fitvids/jquery.fitvids",
        ga: "//www.google-analytics.com/analytics"
    },
    shim: {
        fitvids: {
            deps: ["jquery"]
        },
        ga: {
            exports: "ga"
        }
    }
});

requirejs(["jquery", "modules/sequence", "modules/retinafy", "fitvids", "modules/analytics", "utilities/log"], function ($, sequence, retinafy, fitvids, analytics) {

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

            $(".single-project").fitVids();

            this.bindEvents();

        },

        bindEvents: function () {

            // prevent default hover behaviour

            var touchMoved = false;

            $("a").on("touchend", function (e) {

                e.preventDefault();

                if (touchMoved === false) {

                    window.location.href = $(this).attr("href");

                }

                return false;

            });

            $(window).on("touchmove", function () {

                touchMoved = true;

            }).on("touchstart", function () {

                touchMoved = false;
                
            });

        }

    };

    $(window.document).ready(function () {

        app.init();

    });

});