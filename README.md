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
npm install --save moment.parseformat
```


Usage
-----

```js
var format = moment.parseFormat('Thursday, February 6th, 2014 9:20pm');
// dddd, MMMM Do, YYYY h:mma
moment.format(format); // format
```

Fine Print
----------

The moment.parseFormat Plugin have been authored by [Gregor Martynus](https://github.com/gr2m),
proud member of [Team Hoodie](http://hood.ie/). Support our work: [gittip us](https://www.gittip.com/hoodiehq/).

License: MIT
