/*
 *
 * mdSkew.js
 * v1.1
 *
 * Author: Moreno Di Domenico
 * http://morenodd.com/lab/md-skew
 * http://morenodd.com
 * hello@morenodd.com
 *
 */


function mdSkew(elem, options) {

    function _isDOMElement(obj) {
        return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
    }

    function _extend(object) {
        if (arguments.length <= 0) {
            throw new Error('Missing arguments in _extend function');
        }

        var result = object || {},
            key,
            i;

        for (i = 1; i < arguments.length; i++) {
            var replacement = arguments[i] || {};

            for (key in replacement) {
                if (typeof result[key] === 'object' && !_isDOMElement(result[key])) {
                    result[key] = _extend(result[key], replacement[key]);
                } else {
                    result[key] = result[key] || replacement[key];
                }
            }
        }

        return result;
    }

    this.elem = elem;
    this.options = _extend(options, mdSkew.options);

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
        var pos = {y:0};
        var viewport = {};
        var bounds = {};


        function _isInView(){
            var isVisible = false;

            bounds = {
                top: that.elem.offsetTop,
                bottom: that.elem.offsetTop + that.elem.clientHeight,
                height: that.elem.clientHeight
            };

            if (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom)) {
                isVisible = true;
            }

            return isVisible;
        }


        function _scroll(){
            viewport = {
                top: window.pageYOffset,
                bottom: window.pageYOffset + window.innerHeight
            }; 
        }

        function _wheel(e){
            isScrolling = true;
            scrollSpeed = e.deltaY;

            if (scrollSpeed > 0) {
                scrollSpeed = Math.abs(scrollSpeed) * -1;
            }

            _scroll();        
        }

        function _touchMove(e){
            isScrolling = true;
            scrollSpeed = pos.y - e.touches[0].clientY;

            if (scrollSpeed > 0) {
                scrollSpeed = Math.abs(scrollSpeed) * -1;
            }

            _scroll();        
        }

        function _touchStart(e){
            pos.y = e.touches[0].clientY;           
        }

        window.addEventListener('wheel', _wheel, false);
        window.addEventListener('touchmove', _touchMove, false);
        window.addEventListener('touchstart', _touchStart, false);


        function _skew() {
            requestAnimationFrame(_skew);

            if (isScrolling && _isInView()) {
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
    };
}(window.jQuery));