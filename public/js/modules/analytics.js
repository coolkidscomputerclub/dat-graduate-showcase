define(["ga"], function (ga) {

    var analytics = {

        ga: ga,

        init: function (Events) {

            this.Events = Events;

            this.ga("create", "UA-36035812-2", "digitalartandtechnology.co.uk");

            this.ga("send", "pageview");

        }

    };

    return analytics;
    
});