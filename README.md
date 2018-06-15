# mdSkew.js (v1.1)

---

## Introduction
Suggestion are more than welcome, not only for feature requests but also for coding style improvements.
Let's make this a great library to make people's lives easier!

## Required Files
Simply include `mdSkew.js` (or its minified version `mdSkew.min.js`).

## Initialization
All you need to do is call mdSkew.js inside your js:
```javascript
// select your element
var myElement = document.getElementByID("my-element");

// create the instance
var mdskew = new mdSkew(myElement);

// initialize
mdskew.init();
```

If you need multiple instance:
```javascript
// select your elements
var myElements = document.querySelectorAll("h2");

// loop all elements
myElements.forEach(function(myElement){

	// create the instance
	var mdskew = new mdSkew(myElement);

	// initialize
	mdskew.init();

});
```

A more complex initialization with all options set could look like this:
```javascript
var mdskew = new mdSkew(myElement, {
	min: 0,
	max: 5,
	speed: 1,
	setCSS: true,
	transition: 'transform .6s cubic-bezier(.215,.61,.355,1)',
	transformOrigin: '50% 50%'
});
```
## Options
- `min`: (default `0`) The minimum degrees (it will converted in negative).
- `max`: (default `5`) The maximum degrees (it will converted in negative).
- `speed`: (default `1`) Set the speed of the movement (from 0 to 1).
- `setCSS`: (default `true`) Set default CSS properties for the element.
- `transition`: (default `transform .6s cubic-bezier(.215,.61,.355,1)`) Set CSS transition property for the element.
- `transformOrigin`: (default `50% 50%`) Set CSS transform-origin property for the element.

## jQuery integration
```javascript
$('.my-element').mdSkew();
```

## Reporting issues
1. Please, look for your issue before asking using the github issues search.
2. Make sure you use the latest mdSkew.js version. No support is provided for older versions.
3. Use the [the Github Issues forum](https://github.com/MorenoDD/mdSkew.js/issues) to create issues.
4. **An isolated reproduction of the issue will be required.** Make use of [jsfiddle](https://jsfiddle.net) or [codepen](http://codepen.io) for it if possible.

## Who is using mdSkew.js
If you want your page to be listed here, please <a href="mailto:hello@morenodd.com">contact me</a> with the URL.

## Donations
Donations would be more than welcome :)

[![Donate](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=YXUWQZLQPRBKN&lc=GB&item_name=Moreno%20Di%20Domenico&item_number=mdSkew&no_note=0&cn=Aggiungi%20istruzioni%20speciali%20per%20il%20venditore%3a&no_shipping=2&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)

## Sponsors
Become a sponsor and get your logo on our README on Github with a link to your site. 

## Changelog
### 1.1
- added check if element is in viewport
- added mobile support

## License

**The credit comments in the JavaScript and CSS files should be kept intact** (even after combination or minification )

(The MIT License)

Copyright (c) 2018 Moreno Di Domenico &lt;hello@morenodd.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.