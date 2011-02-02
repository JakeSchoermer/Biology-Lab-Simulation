// ==========================================================================
// Project:   LabBenchDemo.Context-menu
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  View that activates when hovering over desired area of screen to give
	a desscription, and other useful information about the item.

  @extends SC.View
*/

LabBenchDemo.contextPanel = SC.PanelPane.create(
/** @scope LabBenchDemo.Context-menu.prototype */ {
	
	layout: {width: 400, height: 300, centerX: 0, centerY: 0},


	
});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');