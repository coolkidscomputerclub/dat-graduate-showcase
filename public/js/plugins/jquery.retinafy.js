// jquery.retina.js @saulhardman mod of retina.js
// retina.js, a high-resolution image swapper (http://retinajs.com), v0.0.2

define(['jquery'], function ($) {

	$.fn.retinafy = function () {

		var retina = {

			checkRetinaSrc: function (retinaSrc, callback) {

				var http = new XMLHttpRequest();

				http.open('HEAD', retinaSrc);

				http.onreadystatechange = function() {

					if (http.readyState !== 4) {

						if (http.status >= 200 && http.status <= 399) {

							return callback(true);

						} else {

							return callback(false);

						}

					}

				};

				http.send();

			}

		};

		return this.each(function () {

			if (window.devicePixelRatio > 1) {

				var $this = $(this),
					$images = $this.find('img');

				$images.each(function () {

					var $this = $(this),
						originalSrc = $this.attr('src'),
						retinaSrc = originalSrc.replace(/\.\w+$/, function (match) {
							return "@2x" + match;
						});

					retina.checkRetinaSrc(retinaSrc, function (exists) {

						if (exists) {

							$this.attr('src', retinaSrc);

						}

					});

				});

			}

		});

	};

});