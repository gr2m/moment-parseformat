'use strict'

var test = require('tape')
var moment = require('moment')

moment.parseFormat = require('../index')

test('standard cases', function (t) {
  t.equal(moment.parseFormat('Thursday 9:20pm'), 'dddd h:mma', 'Thursday 9:20pm → dddd h:mma')
  t.equal(moment.parseFormat('Thursday, February 6th, 2014 9:20pm'), 'dddd, MMMM Do, YYYY h:mma', 'Thursday, February 6th, 2014 9:20pm → dddd, MMMM Do, YYYY h:mma')
  t.equal(moment.parseFormat('23:20'), 'H:mm', '23:20 → H:mm')
  t.equal(moment.parseFormat('02/03/14'), 'MM/DD/YY', '02/03/14 → MM/DD/YY')
  t.equal(moment.parseFormat('2014-01-10 20:00:15'), 'YYYY-MM-DD H:mm:ss', '2014-01-10 20:00:15 → YYYY-MM-DD H:mm:ss')
  t.equal(moment.parseFormat('Thursday at 9:20pm'), 'dddd [at] h:mma', 'Thursday at 9:20pm → dddd [at] h:mma')
  t.equal(moment.parseFormat(1397418578), 'X', '1397418578 → X')

  t.end()
})

test('GitHub issues', function (t) {
  // https://github.com/gr2m/moment.parseFormat/issues/3
  t.equal(moment.parseFormat('Thursday, February 6th, 2014 9:20pm'), 'dddd, MMMM Do, YYYY h:mma', '#3 Thursday, February 6th, 2014 9:20pm -> dddd, MMMM Do, YYYY h:mma')
  t.equal(moment('Thursday, February 6th, 2014 9:20pm', 'dddd, MMMM Do, YYYY h:mma').date(), 6, '#3 sanity check: "Thursday, February 6th, 2014 9:20pm" parses 6th correctly')

  // https://github.com/gr2m/moment.parseFormat/issues/4
  t.equal(moment.parseFormat('1.1.2010'), 'D.M.YYYY', '#4 1.1.2010 → D.M.YYYY')

  // https://github.com/gr2m/moment.parseFormat/issues/11
  t.equal(moment.parseFormat('9-17-1980'), 'M-D-YYYY', '#11 9-17-1980 → M-D-YYYY')

  // https://github.com/gr2m/moment.parseFormat/issues/11
  t.equal(moment.parseFormat('2014-09-04T01:20:28+02:00'), 'YYYY-MM-DDTHH:mm:ssZ', '#5 2014-02-02T10:11:58+00:00 → YYYY-MM-DDTHH:mm:ssZ')

  // https://github.com/gr2m/moment.parseFormat/issues/14
  t.equal(moment.parseFormat('August 26, 2014 02:30pm'), 'MMMM D, YYYY hh:mma', '#5 August 26, 2014 02:30pm → MMMM D, YYYY hh:mma')
  t.equal(moment.parseFormat('August 06, 2014'), 'MMMM DD, YYYY', '#5 August 06, 2014 → MMMM DD, YYYY')

  // https://github.com/gr2m/moment.parseFormat/issues/12
  t.equal(moment.parseFormat('3-1-81'), 'D-M-YY', '#12 3-1-81 → D-M-YY')

  // https://github.com/gr2m/moment.parseFormat/issues/15
  t.equal(moment.parseFormat('01-01-2015'), 'DD-MM-YYYY', '#15 01-01-2015 → DD-MM-YYYY')
  t.equal(moment.parseFormat('01-01-2015', { preferredOrder: 'MDY' }), 'MM-DD-YYYY', '#15 01-01-2015 (preferredOrder: MDY) → MM-DD-YYYY')

  // // https://github.com/gr2m/moment.parseFormat/pull/21
  t.equal(moment.parseFormat('10/8/2014 5:08:35 PM'), 'M/D/YYYY h:mm:ss A', '#20 10/8/2014 5:08:35 PM → M/D/YYYY h:mm:ss A')
  t.equal(moment.parseFormat('10/8/2014 5:08:35am'), 'M/D/YYYY h:mm:ssa', '#20 10/8/2014 5:08:35 am → M/D/YYYY h:mm:ssa')

  // https://github.com/gr2m/moment.parseFormat/issues/23
  t.equal(moment.parseFormat('2014-23-04T01:20:28.888+02:00'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-23-04T01:20:28.888+02:00 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888+02:00'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-09-04T01:20:28.888+02:00 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888-02:00'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-09-04T01:20:28.888-02:00 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888Z'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-02-02T10:11:58.888Z → YYYY-MM-DDTHH:mm:ss.SSSZ')

  //   // https://github.com/gr2m/moment.parseFormat/pull/29
  t.equal(moment.parseFormat('1434575583'), 'X', '1434575583 → X')
  t.equal(moment.parseFormat('1318781876406'), 'x', '1318781876406 → x')

  //   // https://github.com/gr2m/moment-parseformat/pull/37
  t.equal(moment.parseFormat('October 27 2015 11:28:32.0'), 'MMMM D YYYY HH:mm:ss.S', 'October 27 2015 11:28:32.0 → MMMM D YYYY HH:mm:ss.S')
  t.equal(moment.parseFormat('October 27 2015 11:28:32.01'), 'MMMM D YYYY HH:mm:ss.SS', 'October 27 2015 11:28:32.0 → MMMM D YYYY HH:mm:ss.SS')
  t.equal(moment.parseFormat('October 27 2015 11:28:32.012'), 'MMMM D YYYY HH:mm:ss.SSS', 'October 27 2015 11:28:32.0 → MMMM D YYYY HH:mm:ss.SSS')

  //   // https://github.com/gr2m/moment-parseformat/pull/45
  t.equal(moment.parseFormat('Feb 1 2016 1:03:22.111'), 'MMM D YYYY H:mm:ss.SSS', 'Feb 1 2016 1:03:22.111 → MMM D YYYY H:mm:ss.SSS')
  t.equal(moment.parseFormat('Feb 1 2016 1:03:22.11'), 'MMM D YYYY H:mm:ss.SS', 'Feb 1 2016 1:03:22.111 → MMM D YYYY H:mm:ss.SS')
  t.equal(moment.parseFormat('Feb 1 2016 1:03:22.1'), 'MMM D YYYY H:mm:ss.S', 'Feb 1 2016 1:03:22.111 → MMM D YYYY H:mm:ss.S')

  //   // https://github.com/gr2m/moment-parseformat/issues/56
  t.equal(moment.parseFormat('2014-23-04T01:20:28.888+0200'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#56 2014-23-04T01:20:28.888+0200 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888+0200'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#56 2014-09-04T01:20:28.888+0200 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888-0200'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#56 2014-09-04T01:20:28.888-0200 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28+0200'), 'YYYY-MM-DDTHH:mm:ssZ', '#56 2014-09-04T01:20:28+0200 → YYYY-MM-DDTHH:mm:ssZ')

  //   // https://github.com/gr2m/moment-parseformat/issues/65
  t.equal(moment.parseFormat('Aug 11 2015 11:20p'), 'MMM D YYYY h:mma', '#65 Aug 11 2015 11:20p → MMM D YYYY H:mmp')
  t.equal(moment.parseFormat('Aug 11 2015 11:20a'), 'MMM D YYYY h:mma', '#65 Aug 11 2015 11:20p → MMM D YYYY H:mmp')
  t.equal(moment.parseFormat('Aug 11 2015 11:20P'), 'MMM D YYYY h:mmA', '#65 Aug 11 2015 11:20p → MMM D YYYY H:mmp')
  t.equal(moment.parseFormat('Aug 11 2015 11:20A'), 'MMM D YYYY h:mmA', '#65 Aug 11 2015 11:20p → MMM D YYYY H:mmp')
  t.end()
})

test('GitHub issues - special cases', function (t) {
  t.equal(moment.parseFormat('3/15'), 'M/YY', 'last number is > 12 - 3/15 → M/Y')
  t.equal(moment.parseFormat('03/15'), 'MM/YY', 'last number is > 12 - 03/15 → MM/Y')
  t.equal(moment.parseFormat('11/15'), 'MM/YY', 'last number is > 12 - 11/15 → MM/Y')

  t.equal(moment.parseFormat('15/3'), 'DD/M', 'first number is > 12 - 15/3 → DD/M')

  t.equal(moment.parseFormat('03/12'), 'DD/MM', 'both numbers are < 13 - 03/12 → DD/MM')
  t.equal(moment.parseFormat('3/3'), 'D/M', 'both numbers are < 13 - 3/3 → D/M')
  t.equal(moment.parseFormat('13/2'), 'DD/M', 'first number is > 12 && <= 31 - 13/2 → DD/M')
  t.equal(moment.parseFormat('03/12'), 'DD/MM', 'both numbers are < 13 - 03/12 → DD/MM')
  t.equal(moment.parseFormat('03/03'), 'DD/MM', 'both numbers are < 13 - 03/03 → DD/MM')
  t.equal(moment.parseFormat('13/02'), 'DD/MM', 'first number is > 12 && <= 31 - 13/02 → DD/MM')
  t.equal(moment.parseFormat('3/12'), 'D/MM', 'both numbers are < 13 - 3/12 → D/MM')

  // https://github.com/gr2m/moment-parseformat/issues/19
  t.equal(moment.parseFormat('February 6th, 2014 9.20'), 'MMMM Do, YYYY h.mm', 'February 6th, 2014 9.20 → MMMM Do, YYYY h.mm')
  t.equal(moment.parseFormat('2.2.2014 09.20'), 'D.M.YYYY H.mm', '2.2.2014 09.20 → D.M.YYYY H.mm')
  t.equal(moment.parseFormat('2.2.2014 11.20'), 'D.M.YYYY H.mm', '2.2.2014 11.20 → D.M.YYYY H.mm')
  t.equal(moment.parseFormat('2.2.2014 9.02'), 'D.M.YYYY h.mm', '2.2.2014 9.02 → D.M.YYYY h.mm')

  t.end()
})

test('Github issue #40', function (t) {
  t.equal(moment.parseFormat('31/12/2013'), 'DD/MM/YYYY', '31/12/2013 → DD/MM/YYYY')
  t.equal(moment.parseFormat('12/31/2013'), 'MM/DD/YYYY', '12/31/2013 → MM/DD/YYYY')
  t.equal(moment.parseFormat('31-12-2013'), 'DD-MM-YYYY', '31-12-2013 → DD-MM-YYYY')
  t.equal(moment.parseFormat('12-31-2013'), 'MM-DD-YYYY', '12-31-2013 → MM-DD-YYYY')

  t.end()
})

test('Github issue #52', function (t) {
  t.equal(moment.parseFormat('1-01-2016'), 'D-MM-YYYY', '1-01-2016 → D-MM-YYYY')
  t.end()
})

test('Github issue #59', function (t) {
  t.equal(moment.parseFormat('30/01/16'), 'DD/MM/YY', '30/01/16 → DD/MM/YY')
  t.end()
})

test('Github issue #60', function (t) {
  t.equal(moment.parseFormat('05 2015'), 'MM YYYY', '05 2015 → MM YYYY')
  t.end()
})

// Partially. Need to pass in a flag to get the DD, since this single D format is favored everywhere else
test('Github issue #61', function (t) {
  t.equal(moment.parseFormat('19-feb-1990', { preferLongFormat: true }), 'DD-MMM-YYYY', '05 2015 → DD-MMM-YYYY')
  t.end()
})

test('Github issue #63', function (t) {
  t.equal(moment.parseFormat('Thu Feb 04 2016 16:14:40 GMT 0700'), 'ddd MMM DD YYYY H:mm:ss [GMT] Z', 'Thu Feb 04 2016 16:14:40 GMT 0700 → ddd MMM DD YYYY H:mm:ss [GMT] Z')
  t.end()
})

test('Various date only formats', function (t) {
  t.equal(moment.parseFormat('03/04/18'), 'MM/DD/YY', '03/04/18 → MM/DD/YY')
  t.equal(moment.parseFormat('03/04/2018'), 'MM/DD/YYYY', '03/04/2018 → MM/DD/YYYY')
  t.equal(moment.parseFormat('03/4/18'), 'MM/D/YY', '03/4/18 → MM/D/YY')
  t.equal(moment.parseFormat('03/4/2018'), 'MM/D/YYYY', '03/4/2018 → MM/D/YYYY')
  t.equal(moment.parseFormat('04-Mar'), 'DD-MMM', '04-Mar → DD-MMM')
  t.equal(moment.parseFormat('04-Mar-2018'), 'DD-MMM-YYYY', '04-Mar-2018 → DD-MMM-YYYY')
  t.equal(moment.parseFormat('04-March'), 'DD-MMMM', '04-March → DD-MMMM')
  t.equal(moment.parseFormat('04-March-2018'), 'DD-MMMM-YYYY', '04-March-2018 → DD-MMMM-YYYY')
  t.equal(moment.parseFormat('3/04/18'), 'M/DD/YY', '3/04/18 → M/DD/YY')
  t.equal(moment.parseFormat('3/04/2018'), 'M/DD/YYYY', '3/04/2018 → M/DD/YYYY')
  t.equal(moment.parseFormat('3/4/18'), 'M/D/YY', '3/4/18 → M/D/YY')
  t.equal(moment.parseFormat('3/4/2018'), 'M/D/YYYY', '3/4/2018 → M/D/YYYY')
  t.equal(moment.parseFormat('4 Mar \'18'), 'D MMM \'YY', '4 Mar \'18 → D MMM \'YY')
  t.equal(moment.parseFormat('4 March \'18'), 'D MMMM \'YY', '4 March \'18 → D MMMM \'YY')
  t.equal(moment.parseFormat('4-Mar'), 'D-MMM', '4-Mar → D-MMM')
  t.equal(moment.parseFormat('4-Mar-18'), 'D-MMM-YY', '4-Mar-18 → D-MMM-YY')
  t.equal(moment.parseFormat('4-March'), 'D-MMMM', '4-March → D-MMMM')
  t.equal(moment.parseFormat('4-March-18'), 'D-MMMM-YY', '4-March-18 → D-MMMM-YY')
  t.equal(moment.parseFormat('Mar \'18'), 'MMM \'YY', 'Mar \'18 → MMM \'YY')
  t.equal(moment.parseFormat('Mar 04 \'12'), 'MMM DD \'YY', 'Mar 04 \'12 → MMM DD \'YY')
  t.equal(moment.parseFormat('Mar 04, 2012'), 'MMM DD, YYYY', 'Mar 04, 2012 → MMM DD, YYYY')
  t.equal(moment.parseFormat('Mar 18'), 'MMM YY', 'Mar 18 → MMM YY')
  t.equal(moment.parseFormat('Mar 2018'), 'MMM YYYY', 'Mar 2018 → MMM YYYY')
  t.equal(moment.parseFormat('Mar 4 \'12'), 'MMM D \'YY', 'Mar 4 \'12 → MMM D \'YY')
  t.equal(moment.parseFormat('Mar 4, 2012'), 'MMM D, YYYY', 'Mar 4, 2012 → MMM D, YYYY')
  t.equal(moment.parseFormat('Mar 4th'), 'MMM Do', 'Mar 4th → MMM Do')
  t.equal(moment.parseFormat('Mar 4th \'18'), 'MMM Do \'YY', 'Mar 4th \'18 → MMM Do \'YY')
  t.equal(moment.parseFormat('Mar 4th 2018'), 'MMM Do YYYY', 'Mar 4th 2018 → MMM Do YYYY')
  t.equal(moment.parseFormat('Mar-18'), 'MMM-YY', 'Mar-18 → MMM-YY')
  t.equal(moment.parseFormat('Mar-2018'), 'MMM-YYYY', 'Mar-2018 → MMM-YYYY')
  t.equal(moment.parseFormat('March \'18'), 'MMMM \'YY', 'March \'18 → MMMM \'YY')
  t.equal(moment.parseFormat('March 04 \'12'), 'MMMM DD \'YY', 'March 04 \'12 → MMMM DD \'YY')
  t.equal(moment.parseFormat('March 04, 2012'), 'MMMM DD, YYYY', 'March 04, 2012 → MMMM DD, YYYY')
  t.equal(moment.parseFormat('March 18'), 'MMMM YY', 'March 18 → MMMM YY')
  t.equal(moment.parseFormat('March 2018'), 'MMMM YYYY', 'March 2018 → MMMM YYYY')
  t.equal(moment.parseFormat('March 4 \'12'), 'MMMM D \'YY', 'March 4 \'12 → MMMM D \'YY')
  t.equal(moment.parseFormat('March 4, 2012'), 'MMMM D, YYYY', 'March 4, 2012 → MMMM D, YYYY')
  t.equal(moment.parseFormat('March 4th'), 'MMMM Do', 'March 4th → MMMM Do')
  t.equal(moment.parseFormat('March 4th \'18'), 'MMMM Do \'YY', 'March 4th \'18 → MMMM Do \'YY')
  t.equal(moment.parseFormat('March 4th 18'), 'MMMM Do YY', 'March 4th 18 → MMMM Do YY')
  t.equal(moment.parseFormat('March 4th 2018'), 'MMMM Do YYYY', 'March 4th 2018 → MMMM Do YYYY')
  t.equal(moment.parseFormat('March 4th, 2018'), 'MMMM Do, YYYY', 'March 4th, 2018 → MMMM Do, YYYY')
  t.equal(moment.parseFormat('March-18'), 'MMMM-YY', 'March-18 → MMMM-YY')
  t.equal(moment.parseFormat('March-2018'), 'MMMM-YYYY', 'March-2018 → MMMM-YYYY')
  t.equal(moment.parseFormat('Sun, Mar 04 \'12'), 'ddd, MMM DD \'YY', 'Sun, Mar 04 \'12 → ddd, MMM DD \'YY')
  t.equal(moment.parseFormat('Sun, Mar 04, 2012'), 'ddd, MMM DD, YYYY', 'Sun, Mar 04, 2012 → ddd, MMM DD, YYYY')
  t.equal(moment.parseFormat('Sun, Mar 4 \'12'), 'ddd, MMM D \'YY', 'Sun, Mar 4 \'12 → ddd, MMM D \'YY')
  t.equal(moment.parseFormat('Sun, Mar 4, 2012'), 'ddd, MMM D, YYYY', 'Sun, Mar 4, 2012 → ddd, MMM D, YYYY')
  t.equal(moment.parseFormat('Sun, March 04 \'12'), 'ddd, MMMM DD \'YY', 'Sun, March 04 \'12 → ddd, MMMM DD \'YY')
  t.equal(moment.parseFormat('Sun, March 04, 2012'), 'ddd, MMMM DD, YYYY', 'Sun, March 04, 2012 → ddd, MMMM DD, YYYY')
  t.equal(moment.parseFormat('Sun, March 4 \'12'), 'ddd, MMMM D \'YY', 'Sun, March 4 \'12 → ddd, MMMM D \'YY')
  t.equal(moment.parseFormat('Sun, March 4, 2012'), 'ddd, MMMM D, YYYY', 'Sun, March 4, 2012 → ddd, MMMM D, YYYY')
  t.equal(moment.parseFormat('Sunday, Mar 04 \'12'), 'dddd, MMM DD \'YY', 'Sunday, Mar 04 \'12 → dddd, MMM DD \'YY')
  t.equal(moment.parseFormat('Sunday, Mar 04, 2012'), 'dddd, MMM DD, YYYY', 'Sunday, Mar 04, 2012 → dddd, MMM DD, YYYY')
  t.equal(moment.parseFormat('Sunday, Mar 4 \'12'), 'dddd, MMM D \'YY', 'Sunday, Mar 4 \'12 → dddd, MMM D \'YY')
  t.equal(moment.parseFormat('Sunday, Mar 4, 2012'), 'dddd, MMM D, YYYY', 'Sunday, Mar 4, 2012 → dddd, MMM D, YYYY')
  t.equal(moment.parseFormat('Sunday, March 04 \'12'), 'dddd, MMMM DD \'YY', 'Sunday, March 04 \'12 → dddd, MMMM DD \'YY')
  t.equal(moment.parseFormat('Sunday, March 04, 2012'), 'dddd, MMMM DD, YYYY', 'Sunday, March 04, 2012 → dddd, MMMM DD, YYYY')
  t.equal(moment.parseFormat('Sunday, March 4 \'12'), 'dddd, MMMM D \'YY', 'Sunday, March 4 \'12 → dddd, MMMM D \'YY')
  t.equal(moment.parseFormat('Sunday, March 4, 2012'), 'dddd, MMMM D, YYYY', 'Sunday, March 4, 2012 → dddd, MMMM D, YYYY')

  t.end()
})

test('Various date only formats with preferred order', function (t) {
  t.equal(moment.parseFormat('04/03/18', { preferredOrder: 'DMY' }), 'DD/MM/YY', '04/03/18 → DD/MM/YY')
  t.equal(moment.parseFormat('04/03/2018', { preferredOrder: 'DMY' }), 'DD/MM/YYYY', '04/03/2018 → DD/MM/YYYY')
  t.equal(moment.parseFormat('04/3/18', { preferredOrder: 'DMY' }), 'DD/M/YY', '04/3/18 → DD/M/YY')
  t.equal(moment.parseFormat('04/3/2018', { preferredOrder: 'DMY' }), 'DD/M/YYYY', '04/3/2018 → DD/M/YYYY')
  t.equal(moment.parseFormat('4/03/18', { preferredOrder: 'DMY' }), 'D/MM/YY', '4/03/18 → D/MM/YY')
  t.equal(moment.parseFormat('4/03/2018', { preferredOrder: 'DMY' }), 'D/MM/YYYY', '4/03/2018 → D/MM/YYYY')
  t.equal(moment.parseFormat('4/3/18', { preferredOrder: 'DMY' }), 'D/M/YY', '4/3/18 → D/M/YY')
  t.equal(moment.parseFormat('4/3/2018', { preferredOrder: 'DMY' }), 'D/M/YYYY', '4/3/2018 → D/M/YYYY')

  t.end()
})
