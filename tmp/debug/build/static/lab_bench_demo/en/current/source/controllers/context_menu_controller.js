// ==========================================================================
// Project:   LabBenchDemo.contextMenu
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
LabBenchDemo.contextMenuController = SC.ObjectController.create(
/** @scope LabBenchDemo.contextMenu.prototype */ {

  create: function() {
		//LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.appendChild(LabBenchDemo.contextMenu);
		var contextMenu = LabBenchDemo.contextMenu
		contextMenu.append()
		
		return YES;
	},

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');