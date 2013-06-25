define(["ga"], function (ga) {

    var analytics = {

        ga: ga,

        init: function (Events) {

            this.Events = Events;

            this.ga("create", "UA-41990880-1", "datdegreeshow.co.uk");

            this.ga("send", "pageview");

        }

    };

    return analytics;
    
});