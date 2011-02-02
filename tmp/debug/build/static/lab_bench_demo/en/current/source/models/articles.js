// ==========================================================================
// Project:   LabBenchDemo.Articles
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document your Articles here)

  @extends SC.Record
  @version 0.1
*/
LabBenchDemo.Articles = SC.Record.extend(
/** @scope LabBenchDemo.Articles.prototype */ {

	guid: SC.Record.attr(Number),
	ArticleTitle: SC.Record.attr(String),
	ArticleText: SC.Record.attr(String)
	
}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');