'use strict';

(function (root, factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    define(['moment'], function (moment) {
      moment.parseFormat = factory(moment);
      return moment.parseFormat;
    });
  } else if (typeof exports === 'object') {
    module.exports = factory(require('moment'));
  } else {
    root.moment.parseFormat = factory(root.moment);
  }
})(this, function (/*moment*/) { // jshint ignore:line
  var dayNames =  [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var abbreviatedDayNames =  [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var shortestDayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  var monthNames =  [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var abbreviatedMonthNames =  [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var amDesignator =  'AM';
  var pmDesignator =  'PM';

  var regexDayNames = new RegExp( dayNames.join('|'), 'i' );
  var regexAbbreviatedDayNames = new RegExp( abbreviatedDayNames.join('|'), 'i' );
  var regexShortestDayNames = new RegExp( '\\b('+shortestDayNames.join('|')+')\\b', 'i' );
  var regexMonthNames = new RegExp( monthNames.join('|'), 'i' );
  var regexAbbreviatedMonthNames = new RegExp( abbreviatedMonthNames.join('|'), 'i' );

  var regexFirstSecondThirdFourth = /(\d+)(st|nd|rd|th)\b/i;
  var regexEndian = /(\d{1,4})([\/\.\-])(\d{1,2})[\/\.\-](\d{1,4})/;

  var regexTimezone = /\+\d\d:\d\d$/
  var amOrPm = '('+[amDesignator,pmDesignator].join('|')+')';
  var regexHoursWithLeadingZeroDigitMinutesSecondsAmPm = new RegExp( '0\\d\\:\\d{1,2}\\:\\d{1,2}(\\s*)' + amOrPm,  'i' );
  var regexHoursWithLeadingZeroDigitMinutesAmPm = new RegExp( '0\\d\\:\\d{1,2}(\\s*)' + amOrPm,  'i' );
  var regexHoursWithLeadingZeroDigitAmPm = new RegExp( '0\\d(\\s*)' + amOrPm,  'i' );
  var regexHoursMinutesSecondsAmPm = new RegExp( '\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}(\\s*)' + amOrPm,  'i' );
  var regexHoursMinutesAmPm = new RegExp( '\\d{1,2}\\:\\d{1,2}(\\s*)' + amOrPm,  'i' );
  var regexHoursAmPm = new RegExp( '\\d{1,2}(\\s*)' + amOrPm,  'i' );

  var regexHoursWithLeadingZeroMinutesSeconds = /0\d:\d{2}:\d{2}/;
  var regexHoursWithLeadingZeroMinutes = /0\d:\d{2}/;
  var regexHoursMinutesSeconds = /\d{1,2}:\d{2}:\d{2}/;
  var regexHoursMinutes = /\d{1,2}:\d{2}/;
  var regexYearLong = /\d{4}/;
  var regexDayLeadingZero = /0\d/;
  var regexDay = /\d{1,2}/;
  var regexYearShort = /\d{2}/;

  var regexFillingWords = /\b(at)\b/i;

  // option defaults
  var defaultOrder = {
    '/': 'MDY',
    '.': 'DMY',
    '-': 'YMD'
  };

  function parseDateFormat(dateString, options) {
    var format = dateString;

    // default options
    options = options || {};
    options.preferredOrder = options.preferredOrder || defaultOrder;

    // escape filling words
    format = format.replace(regexFillingWords, '[$1]');

    //  DAYS

    // Monday ☛ dddd
    format = format.replace( regexDayNames, 'dddd');
    // Mon ☛ ddd
    format = format.replace( regexAbbreviatedDayNames, 'ddd');
    // Mo ☛ dd
    format = format.replace( regexShortestDayNames, 'dd');

    // 1st, 2nd, 23rd ☛ do
    format = format.replace( regexFirstSecondThirdFourth, 'Do');

    // MONTHS

    // January ☛ MMMM
    format = format.replace( regexMonthNames, 'MMMM');
    // Jan ☛ MMM
    format = format.replace( regexAbbreviatedMonthNames, 'MMM');

    // replace endians, like 8/20/2010, 20.8.2010 or 2010-8-20
    format = format.replace( regexEndian, replaceEndian.bind(null, options));

    // TIME

    // timezone +02:00 ☛ Z
    format = format.replace(regexTimezone, 'Z');

    // 05:30:20pm ☛ hh:mm:ssa
    format = format.replace(regexHoursWithLeadingZeroDigitMinutesSecondsAmPm, 'hh:mm:ss$1a');
    // 10:30:20pm ☛ h:mm:ssa
    format = format.replace(regexHoursMinutesSecondsAmPm, 'h:mm:ss$1a');
    // 05:30pm ☛ hh:mma
    format = format.replace(regexHoursWithLeadingZeroDigitMinutesAmPm, 'hh:mm$1a');
    // 10:30pm ☛ h:mma
    format = format.replace(regexHoursMinutesAmPm, 'h:mm$1a');
    // 05pm ☛ hha
    format = format.replace(regexHoursWithLeadingZeroDigitAmPm, 'hh$1a');
    // 10pm ☛ ha
    format = format.replace(regexHoursAmPm, 'h$1a');
    // 05:30:20 ☛ HH:mm:ss
    format = format.replace(regexHoursWithLeadingZeroMinutesSeconds, 'HH:mm:ss');
    // 10:30:20 ☛ H:mm:ss
    format = format.replace(regexHoursMinutesSeconds, 'H:mm:ss');
    // 05:30 ☛ H:mm
    format = format.replace(regexHoursWithLeadingZeroMinutes, 'HH:mm');
    // 10:30 ☛ HH:mm
    format = format.replace(regexHoursMinutes, 'H:mm');

    // do we still have numbers left?

    // Lets check for 4 digits first, these are years for sure
    format = format.replace(regexYearLong, 'YYYY');

    // now, the next number, if existing, must be a day
    format = format.replace(regexDayLeadingZero, 'DD');
    format = format.replace(regexDay, 'D');

    // last but not least, there could still be a year left
    format = format.replace(regexYearShort, 'YY');

    return format;
  }

  // if we can't find an endian based on the separator, but
  // there still is a short date with day, month & year,
  // we try to make a smart decision to identify the order
  function replaceEndian(options, matchedPart, first, separator, second, third) {
    var parts;
    var hasSingleDigit = Math.min(first.length, second.length, third.length) === 1;
    var hasQuadDigit = Math.max(first.length, second.length, third.length) === 4;
    var index = -1;
    var preferredOrder = typeof options.preferredOrder === 'string' ? options.preferredOrder : options.preferredOrder[separator];

    first = parseInt(first, 10);
    second = parseInt(second, 10);
    third = parseInt(third, 10);
    parts = [first, second, third];
    preferredOrder = preferredOrder.toUpperCase();

    // If first is a year, order will always be Year-Month-Day
    if (first > 31) {
      parts[0] = hasQuadDigit ? 'YYYY' : 'YY';
      parts[1] = hasSingleDigit ? 'M' : 'MM';
      parts[2] = hasSingleDigit ? 'D' : 'DD';
      return parts.join(separator);
    }

    // Second will never be the year. And if it is a day,
    // the order will always be Month-Day-Year
    if (second > 12) {
      parts[0] = hasSingleDigit ? 'M' : 'MM';
      parts[1] = hasSingleDigit ? 'D' : 'DD';
      parts[2] = hasQuadDigit ? 'YYYY' : 'YY';
      return parts.join(separator);
    }

    // if third is a year ...
    if (third > 31) {
      parts[2] = hasQuadDigit ? 'YYYY' : 'YY';

      // ... try to find day in first and second.
      // If found, the remaining part is the month.
      index = first > 12 ? 0 : second > 12 ? 1 : -1;
      if (index !== -1) {
        parts[index] = hasSingleDigit ? 'D' : 'DD';
        index = index === 0 ? 1 : 0;
        parts[index] = hasSingleDigit ? 'M' : 'MM';
        return parts.join(separator);
      }
    }

    // if we had no luck until here, we use the preferred order
    parts[preferredOrder.indexOf('D')] = hasSingleDigit ? 'D' : 'DD';
    parts[preferredOrder.indexOf('M')] = hasSingleDigit ? 'M' : 'MM';
    parts[preferredOrder.indexOf('Y')] = hasQuadDigit ? 'YYYY' : 'YY';

    return parts.join(separator);
  }

  return parseDateFormat;
});
