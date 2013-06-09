define(["jquery", "plugins/jquery.retinafy"], function ($) {

    var retinafy = {

        $el: $("body"),

        init: function () {

            this.$el.retinafy();

        }

    };

    return retinafy;

});