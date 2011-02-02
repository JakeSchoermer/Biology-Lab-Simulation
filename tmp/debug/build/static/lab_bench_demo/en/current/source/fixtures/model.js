// ==========================================================================
// Project:   LabBenchDemo.Model Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

sc_require('models/model');

LabBenchDemo.Model.FIXTURES = [

  // TODO: Add your data fixtures here.

	{ guid: 1,
		ArticleTitle: "Blah Title",
		ArticleText: "Blah Text"},

	{ guid: 2,
		ArticleTitle: "Blah Title",
		ArticleText: "Blah Text"},
  

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');