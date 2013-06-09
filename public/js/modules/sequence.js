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

            this.stepSequence($el);

        },

        stopSequence: function ($el) {

            this.active = false;

            clearTimeout(this.timeout);

            this.frame = 1;

            $el.css({
                "left": this.frameWidth
            });

        },

        stepSequence: function ($el) {

            var self = this,
                pos;

            pos = (this.frame - 1) * -this.frameWidth;

            console.log("Pos: ", pos);

            $el.css({
                "left": pos + "px"
            });

            this.timeout = setTimeout(function () {

                if (self.active === true) {

                    self.stepSequence($el);

                }

            }, this.interval);

            if (this.frame === this.frames) {

                this.frame = 1;

            } else {

                this.frame++;

            }

        }

    };

    return example;

});
