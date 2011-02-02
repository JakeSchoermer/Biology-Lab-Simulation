// ==========================================================================
// Project:   LabBenchDemo.videoPlayerController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
LabBenchDemo.videoPlayerController = SC.ObjectController.create(
/** @scope LabBenchDemo.videoPlayerController.prototype */ {

  	getArticleVideo: function (recordID) {

		return LabBenchDemo.store.find(LabBenchDemo.Articles, recordID).get('ArticleVideo');
	}

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');