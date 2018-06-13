/*
 *
 * mdSkew.js
 * v1.0
 *
 * Author: Moreno Di Domenico
 * http://morenodd.com/lab/md-skew
 * http://morenodd.com
 * hello@morenodd.com
 *
 */


/**
 * Check if object is part of the DOM
 * @constructor
 * @param {Object} obj element to check
 */
function isDOMElement(obj) {
    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
}

/**
 * Helper function for extending objects
 */
function extend(object /*, objectN ... */ ) {
    if (arguments.length <= 0) {
        throw new Error('Missing arguments in extend function');
    }

    var result = object || {},
        key,
        i;

    for (i = 1; i < arguments.length; i++) {
        var replacement = arguments[i] || {};

        for (key in replacement) {
            // Recurse into object except if the object is a DOM element
            if (typeof result[key] === 'object' && !isDOMElement(result[key])) {
                result[key] = extend(result[key], replacement[key]);
            } else {
                result[key] = result[key] || replacement[key];
            }
        }
    }

    return result;
}


function mdSkew(elem, options) {
    this.elem = elem;
    this.options = extend(options, mdSkew.options);

    if (this.options.min > 0) {
        this.options.min = Math.abs(this.options.min) * -1;
    }

    if (this.options.max > 0) {
        this.options.max = Math.abs(this.options.max) * -1;
    }
}


mdSkew.prototype = {
    constructor: mdSkew,
    init: function() {
        this._start();
        this._setCSS();
        this._scroll();
        return this;
    },
    _start: function() {
        this.elem.style.transform = 'skewY(' + this.options.min + 'deg)';
    },
    _setCSS: function() {
        if (!this.options.setCSS) { return; }
        this.elem.style.transition = this.options.transition;
        this.elem.style.transformOrigin = this.options.transformOrigin;
    },
    _scroll: function() {

        var isScrolling = false;
        var scrollSpeed = 0;
        var skewY = 0;
        var that = this;

        window.addEventListener('wheel', function(e) {
            isScrolling = true;
            scrollSpeed = e.deltaY;

            if (scrollSpeed > 0) {
                scrollSpeed = Math.abs(scrollSpeed) * -1;
            }
        });


        function _skew() {
            requestAnimationFrame(_skew);

            if (isScrolling) {
                isScrolling = false;

                skewY = scrollSpeed * that.options.speed;

                if (skewY > 0) {
                    skewY = 0;
                } else if (skewY < that.options.max) {
                    skewY = that.options.max;
                } else if (skewY > that.options.min) {
                    skewY = that.options.min;
                }

                that.elem.style.transform = 'skewY(' + skewY + 'deg)';

            } else {
                that._start();
            }
        }

        _skew();
    }
};


mdSkew.options = {
    min: 0,
    max: 5,
    speed: 1,
    setCSS: true,
    transition: 'transform .6s cubic-bezier(.215,.61,.355,1)',
    transformOrigin: '50% 50%'
};


(function($) {
    if (!$) { return; }
    $.fn.mdSkew = function(options) {
        if (options === undefined) { options = {}; }
        return this.each(function() {
            var i = new mdSkew(this, options);
            i.init();
        });
    }
}(window.jQuery));