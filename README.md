moment.parseFormat – a moment.js plugin
=======================================

> A moment.js plugin to extract the format of a date/time string

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/gr2m/moment.parseFormat
[travis-image]: https://api.travis-ci.org/gr2m/moment.parseFormat.png?branch=gh-pages

[![Coverage Status](https://coveralls.io/repos/gr2m/moment.parseFormat/badge.svg?branch=&service=github)](https://coveralls.io/github/gr2m/moment.parseFormat?branch=gh-pages)

Installation
------------

Load via script tag

```html
<script src="moment.js"></script>
<script src="moment.parseFormat.js"></script>
```

Install using [bower](http://bower.io/) for usage in browser:

```
bower install --save moment-parseformat
```

Install using [npm](https://npmjs.org/) for node.js:

```
npm install --save moment-parseformat
```


Browser Usage
-----

```js
var format = moment.parseFormat('Thursday, February 6th, 2014 9:20pm'/* , options */);
// dddd, MMMM Do, YYYY h:mma
moment().format(format); // format
```


Node / CommonJS Usage
-----
```js
var moment  = require 'moment'
var parseFormat = require('moment-parseformat')

var format = parseFormat('Thursday, February 6th, 2014 9:20pm'/* , options */);
// dddd, MMMM Do, YYYY h:mma
moment().format(format); // format
```


Options
----

Options can be passed as 2nd parameter


#### preferredOrder
Type: `Object` or `String`

`parseFormat` tries to figure out the the order of day/month/year by itself
if it finds 3 numbers separated by `.`, `-` or `/`. But if it can't, it will fallback
to `preferredOrder`, which can either be set as an object to differentiate by separator,
or as a simple string.

Default value:

```js
preferredOrder: {
  '/': 'MDY',
  '.': 'DMY',
  '-': 'YMD'
}
```

Usage

```js
parseFormat('10.10.2010', {preferredOrder: 'DMY'});
// ☛ DD.MM.YYYY
parseFormat('10.10.2010', {preferredOrder: 'MDY'});
// ☛ MM.DD.YYYY
parseFormat('10.10.2010', {preferredOrder: {
  '/': 'MDY',
  '.': 'DMY',
  '-': 'YMD'
}});
// ☛ MM.DD.YYYY
parseFormat('10/10/2010', {preferredOrder: {
  '/': 'MDY',
  '.': 'DMY',
  '-': 'YMD'
}});
// ☛ DD/MM/YYYY
```


Fine Print
----------

The moment.parseFormat Plugin have been authored by [Gregor Martynus](https://github.com/gr2m),
proud member of the [Hoodie Community](http://hood.ie/).

License: MIT
