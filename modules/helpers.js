var helpers = {

    toSlug: function (string) {

        string = string.toLowerCase();

        string = string.replace(/[^a-z0-9]+/g, '-');

        string = string.replace(/^-|-$/g, '');

        return string;

    }

};

module.exports = helpers;