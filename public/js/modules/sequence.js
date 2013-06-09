define(["jquery"], function ($) {

    var example = {

        $el: $(".project-image"),

        selector: ".sequence",

        interval: 100,

        active: false,

        frame: 1,

        frames: 10,

        frameWidth: 290,

        init: function (Events) {

            this.Events = Events;

            this.bindEvents();

        },

        bindEvents: function () {

            var self = this;

            this.$el.on("mouseenter", function () {

                self.startSequence($(this).find(self.selector));

            }).on("mouseleave", function () {

                self.stopSequence($(this).find(self.selector));

            });

        },

        startSequence: function ($el) {

            var self = this;

            this.active = true;

            $el.addClass("active");

            this.timeout = setTimeout(function () {

                if (self.active === true) {

                    self.stepSequence($el);

                }

            }, this.interval);

        },

        stopSequence: function ($el) {

            this.active = false;

            clearTimeout(this.timeout);

            this.frame = 1;

            $el.removeClass("active");

            $el.css({
                "background-position": "0px 0px"
            });

        },

        stepSequence: function ($el) {

            var self = this,
                pos;

            if (this.frame === this.frames) {

                this.frame = 1;

            } else {

                this.frame++;

            }

            pos = (this.frame - 1) * -this.frameWidth;

            pos += "px 0px";

            $el.css({
                "background-position": pos
            });

            this.timeout = setTimeout(function () {

                if (self.active === true) {

                    self.stepSequence($el);

                }

            }, this.interval);

        }

    };

    return example;

});
