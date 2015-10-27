'use strict'

var test = require('tape')
var moment = require('moment')

moment.parseFormat = require('../moment.parseFormat')

test('standard cases', function (t) {
  t.equal(moment.parseFormat('Thursday 9:20pm'), 'dddd h:mma', 'Thursday 9:20pm → dddd h:mma')
  t.equal(moment.parseFormat('Thursday, February 6th, 2014 9:20pm'), 'dddd, MMMM Do, YYYY h:mma', 'Thursday, February 6th, 2014 9:20pm → dddd, MMMM Do, YYYY h:mma')
  t.equal(moment.parseFormat('23:20'), 'H:mm', '23:20 → H:mm')
  t.equal(moment.parseFormat('02/03/14'), 'MM/DD/YY', '02/03/14 → MM/DD/YY')
  t.equal(moment.parseFormat('2014-01-10 20:00:15'), 'YYYY-MM-DD H:mm:ss', '2014-01-10 20:00:15 → YYYY-MM-DD H:mm:ss')
  t.equal(moment.parseFormat('Thursday at 9:20pm'), 'dddd [at] h:mma', 'Thursday at 9:20pm → dddd [at] h:mma')

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
  t.equal(moment.parseFormat('01-01-2015', {preferredOrder: 'MDY'}), 'MM-DD-YYYY', '#15 01-01-2015 (preferredOrder: MDY) → MM-DD-YYYY')

  // https://github.com/gr2m/moment.parseFormat/pull/21
  t.equal(moment.parseFormat('10/8/2014 5:08:35 PM'), 'M/D/YYYY h:mm:ss A', '#20 10/8/2014 5:08:35 PM → M/D/YYYY h:mm:ss A')
  t.equal(moment.parseFormat('10/8/2014 5:08:35am'), 'M/D/YYYY h:mm:ssa', '#20 10/8/2014 5:08:35 am → M/D/YYYY h:mm:ssa')

  // https://github.com/gr2m/moment.parseFormat/issues/23
  t.equal(moment.parseFormat('2014-23-04T01:20:28.888+02:00'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-23-04T01:20:28.888+02:00 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888+02:00'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-09-04T01:20:28.888+02:00 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888-02:00'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-09-04T01:20:28.888-02:00 → YYYY-MM-DDTHH:mm:ss.SSSZ')
  t.equal(moment.parseFormat('2014-09-04T01:20:28.888Z'), 'YYYY-MM-DDTHH:mm:ss.SSSZ', '#23 2014-02-02T10:11:58.888Z → YYYY-MM-DDTHH:mm:ss.SSSZ')

  // https://github.com/gr2m/moment.parseFormat/pull/29
  t.equal(moment.parseFormat('1434575583'), 'X', '1434575583 → X')
  t.equal(moment.parseFormat('1318781876406'), 'x', '1318781876406 → x')

  t.end()
})

test('GitHub issues - special cases', function (t) {
  // https://github.com/gr2m/moment-parseformat/issues/17
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
