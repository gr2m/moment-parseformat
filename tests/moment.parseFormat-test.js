/* global moment, test, equal */

test('standard cases', function() {
  'use strict';

  equal( moment.parseFormat('Thursday 9:20pm'), 'dddd h:mma', 'Thursday 9:20pm → dddd h:mma' );
  equal( moment.parseFormat('Thursday, February 6th, 2014 9:20pm'), 'dddd, MMMM Do, YYYY h:mma', 'Thursday, February 6th, 2014 9:20pm → dddd, MMMM Do, YYYY h:mma' );
  equal( moment.parseFormat('23:20'), 'H:mm', '23:20 → H:mm' );
  equal( moment.parseFormat('02/03/14'), 'MM/DD/YY', '02/03/14 → MM/DD/YY' );
  equal( moment.parseFormat('2014-01-10 20:00:15'), 'YYYY-MM-DD H:mm:ss', '2014-01-10 20:00:15 → YYYY-MM-DD H:mm:ss' );
  equal( moment.parseFormat('Thursday at 9:20pm'), 'dddd [at] h:mma', 'Thursday at 9:20pm → dddd [at] h:mma' );
});

test('GitHub issues', function() {
  'use strict';

  // https://github.com/gr2m/moment.parseFormat/issues/3
  equal( moment.parseFormat('Thursday, February 6th, 2014 9:20pm'), 'dddd, MMMM Do, YYYY h:mma', '#3 Thursday, February 6th, 2014 9:20pm -> dddd, MMMM Do, YYYY h:mma' );
  equal( moment('Thursday, February 6th, 2014 9:20pm', 'dddd, MMMM Do, YYYY h:mma').date(), 6, '#3 sanity check: "Thursday, February 6th, 2014 9:20pm" parses 6th correctly' );

  // https://github.com/gr2m/moment.parseFormat/issues/4
  equal( moment.parseFormat('1.1.2010'), 'D.M.YYYY', '#4 1.1.2010 → D.M.YYYY' );

  // https://github.com/gr2m/moment.parseFormat/issues/11
  equal( moment.parseFormat('9-17-1980'), 'M-D-YYYY', '#11 9-17-1980 → M-D-YYYY' );
});
