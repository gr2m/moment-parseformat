moment.parseFormat – a moment.js plugin
=======================================

> A moment.js plugin to extract the format of a date/time string

Installation
------------

Simplest way to install is using [bower](http://bower.io/):

```
bower install --save moment.parseFormat
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
