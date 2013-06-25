var helpers = {

    toSlug: function (string) {

        string = string.toLowerCase();

        string = string.replace(/[^a-z0-9]+/g, '-');

        string = string.replace(/^-|-$/g, '');

        return string;

    },

    randomise: function (array) {

        var i = array.length,
            j,
            temp;
        
        if ( i === 0 ) return false;

        while (--i) {

            j = Math.floor( Math.random() * ( i + 1 ) );

            temp = array[i];

            array[i] = array[j];

            array[j] = temp;

        }

    }

};

module.exports = helpers;