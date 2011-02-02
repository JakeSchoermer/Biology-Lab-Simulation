// ==========================================================================
// Project:   LabBenchDemo.WidgetTypes Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

sc_require('models/widget_types');



LabBenchDemo.WidgetTypes.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

{ guid: 1,
	picture: '/static/lab_bench_demo/en/current/resources/images/ttubeopen.png?1290040497',
  type: "openTT", 
  x: 80,
  y: 216},
     
{ guid: 2,
	 picture: '/static/lab_bench_demo/en/current/resources/images/ttubeclosed.png?1290040497',
	 type: "closedTT",
	 x: 80,
	 y: 216 },

{guid: 3,
		picture: null,
		type: "Testtube",
		x:37,
		y:128},
		
{ guid: 4,
   	picture: '/static/lab_bench_demo/en/current/resources/images/yelpipclose.png?1291274261',
    type: "beaker" ,
    x: 150,
    y: 719},

{ guid: 5,
    picture: '/static/lab_bench_demo/en/current/resources/images/pipBlueNum.png?1288229640',
    type: "pipette" ,
    x: 100,
    y: 397},
{
	  guid: 6,
	  picture: '/static/lab_bench_demo/en/current/resources/images/ttubefill.png?1290040497',
	  type: "ttubefill",
	  x:80,
	  y:216
}

 

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');