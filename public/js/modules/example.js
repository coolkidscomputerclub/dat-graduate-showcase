define(["jquery"], function ($) {

    var example = {

        $el: $("#example"),

        init: function (Events) {

            this.Events = Events;

            this.bindEvents();

        },

        bindEvents: function () {

            // bind some events

        }

    };

    return example;

});