requirejs.config({
    paths: {
        jquery: "components/jquery/jquery",
    }
});

requirejs(["jquery", "modules/example", "modules/retinafy", "utilities/log"], function ($, example, retinafy) {

    var app = {

        Modules: {

            example: example,

            retinafy: retinafy

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