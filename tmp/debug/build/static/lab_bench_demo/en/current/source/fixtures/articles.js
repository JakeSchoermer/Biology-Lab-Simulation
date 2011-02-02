// ==========================================================================
// Project:   LabBenchDemo.Articles Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

sc_require('Models/Articles');

LabBenchDemo.Articles.FIXTURES = [

  // TODO: Add your data fixtures here.

	{ guid: 1,
		ArticleTitle: "Blah Title 1",
		ArticleText: "Article 1"},

	{ guid: 2,
		ArticleTitle: "Blah Title 2",
		ArticleText: "Blah Text 2"},
		
	{ guid: 3,
		ArticleTitle: "Blah Title 3",
		ArticleText: "Blah Text 3"},

	{ guid: 4,
		ArticleTitle: "Blah Title 4",
		ArticleText: " Article Text 4",
		ArticleVideo: "<video controls>" +
                            "<source width='480' height='360' src='/lab_bench_demo/en/current/resources/videos/4.mp4'/>"+
                            "<source width='480' height='360' src='/lab_bench_demo/en/current/resources/videos/4.ogg'/>"+
                      "</video>"
    },
			
	{ guid: 5,
		ArticleTitle: "Blah Title 5",
		ArticleText: "Blah Text 5"
	},
				
	{ guid: 6,
		ArticleTitle: "Blah Title 6",
		ArticleText: "Blah Text 6"}
];


//Foyercam Video Feed
//ArticleVideo: '<iframe src ="http://foyercam.itee.uq.edu.au/axis-cgi/mjpg/video.cgi?camera=&resolution=640x480" width="640" height="480"><p>Your browser does not support iframes.</p></iframe>'}; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');