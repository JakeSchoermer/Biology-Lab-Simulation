// ==========================================================================
// Project:   LabBenchDemo.contextPanel
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

LabBenchDemo.contextPanelController = SC.ObjectController.create(
/** @scope LabBenchDemo.contextPanel.prototype */ {
	
	recordID: null,
	
	create: function(recordID) {
		//LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.appendChild(LabBenchDemo.contextPanel);
		LabBenchDemo.contextPanel.append();

		return YES;
	},
	
	destroy: function() {
		LabBenchDemo.contextPanel.remove();
		return YES;
	},
	
	getArticleTitle: function (recordID) {
		return LabBenchDemo.store.find(LabBenchDemo.Articles, recordID).get('ArticleTitle');
	},
	
	getArticleText: function (recordID) {
		return LabBenchDemo.store.find(LabBenchDemo.Articles, recordID).get('ArticleText');
	},
	
}) ;
