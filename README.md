moment.parseFormat – a moment.js plugin
=======================================

> A moment.js plugin to extract the format of a date/time string

Installation
------------

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
proud member of [Team Hoodie](http://hood.ie/). Support our work: [gittip us](https://www.gittip.com/hoodiehq/).

License: MIT
