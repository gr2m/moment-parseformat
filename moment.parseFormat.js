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
  var regexBigEndian = /(\d{2,4})\-(\d{1,2})\-(\d{1,2})/;
  var regexLittleEndian = /(\d{1,2})\.(\d{1,2})\.(\d{2,4})/;
  var regexMiddleEndian = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/;

  var amOrPm = '('+[amDesignator,pmDesignator].join('|')+')';
  var regexHoursMinutesSecondsAmPm = new RegExp( '\\d{1,2}\\:\\d{1,2}\\:\\d{1,2}(\\s*)' + amOrPm,  'i' );
  var regexHoursMinutesAmPm = new RegExp( '\\d{1,2}\\:\\d{1,2}(\\s*)' + amOrPm,  'i' );
  var regexHoursAmPm = new RegExp( '\\d{1,2}(\\s*)' + amOrPm,  'i' );

  var regexHoursMinutesSeconds = /\d{1,2}:\d{2}:\d{2}/;
  var regexHoursMinutes = /\d{1,2}:\d{2}/;
  var regexYearLong = /\d{4}/;
  var regexDay = /\d{1,2}/;
  var regexYearShort = /\d{2}/;

  var regexFillingWords = /\b(at)\b/i;

  function parseDateFormat(dateString) {
    var format = dateString;

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

    // DAY - MONTH - YEAR ORDER

    // 03-04-05 ☛ yy-
    format = format.replace( regexBigEndian, replaceBigEndian);

    // Little-endian (day, month, year), e.g. 05.04.03
    format = format.replace(regexLittleEndian, replaceLittleEndian);

    // Middle-endian (month, day, year), e.g. 04/05/03
    format = format.replace( regexMiddleEndian, replaceMiddleEndian);

    // TIME

    // 10:30:20pm ☛ h:mm:ssa
    format = format.replace(regexHoursMinutesSecondsAmPm, 'h:mm:ss$1a');
    // 10:30pm ☛ h:mma
    format = format.replace(regexHoursMinutesAmPm, 'h:mm$1a');
    // 10pm ☛ ha
    format = format.replace(regexHoursAmPm, 'h$1a');

    // 10:30:20 ☛ H:mm:ss
    format = format.replace(regexHoursMinutesSeconds, 'H:mm:ss');

    // 10:30 ☛ H:mm
    format = format.replace(regexHoursMinutes, 'H:mm');

    // do we still have numbers left?

    // Lets check for 4 digits first, these are years for sure
    format = format.replace(regexYearLong, 'YYYY');

    // now, the next number, if existing, must be a day
    format = format.replace(regexDay, 'D');

    // last but not least, there could still be a year left
    format = format.replace(regexYearShort, 'YY');

    return format;
  }

  // 2014-01-01 → YYYY-MM-DD
  // 14-01-01 → YY-MM-DD
  // 14-1-1 → YY-M-D
  // 2014-1-1 → YYYY-M-D
  function replaceBigEndian (all, year, month, day) {
    year = (year.length === 2) ? 'YY' : 'YYYY';
    if (Math.min(day.length, month.length) === 1) {
      day = 'D';
      month = 'M';
    } else {
      day = 'DD';
      month = 'MM';
    }
    return [year,month,day].join('-');
  }

  // 01.01.2014 → DD.MM.YYYY
  // 01.01.14 → DD.MM.YY
  // 1.1.14 → D.M.YY
  // 1.1.2014 → D.M.YYYY
  function replaceLittleEndian (all, day, month, year) {
    year = (year.length === 2) ? 'YY' : 'YYYY';
    if (Math.min(day.length, month.length) === 1) {
      day = 'D';
      month = 'M';
    } else {
      day = 'DD';
      month = 'MM';
    }
    return [day,month,year].join('.');
  }

  // 01/01/2014 → DD/MM/YYYY
  // 01/01/14 → DD/MM/YY
  // 1/1/14 → D/M/YY
  // 1/1/2014 → D/M/YYYY
  function replaceMiddleEndian (all, month, day, year) {
    year = (year.length === 2) ? 'YY' : 'YYYY';
    if (Math.min(day.length, month.length) === 1) {
      day = 'D';
      month = 'M';
    } else {
      day = 'DD';
      month = 'MM';
    }
    return [month,day,year].join('/');
  }

  return parseDateFormat;
});
