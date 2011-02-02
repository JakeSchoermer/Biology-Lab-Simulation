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
	picture: sc_static("images/ttubeopen.png"),
  type: "openTT", 
  x: 80,
  y: 216},
     
{ guid: 2,
	 picture: sc_static("images/ttubeclosed.png"),
	 type: "closedTT",
	 x: 80,
	 y: 216 },

{guid: 3,
		picture: null,
		type: "Testtube",
		x:37,
		y:128},
		
{ guid: 4,
   	picture: sc_static("images/yelpipclose.png"),
    type: "beaker" ,
    x: 150,
    y: 719},

{ guid: 5,
    picture: sc_static("images/pipBlueNum.png"),
    type: "pipette" ,
    x: 100,
    y: 397},
{
	  guid: 6,
	  picture: sc_static("images/ttubefill.png"),
	  type: "ttubefill",
	  x:80,
	  y:216
}

 

];
