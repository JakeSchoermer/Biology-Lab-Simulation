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

LabBenchDemo.contextMenu = SC.View.create(
/** @scope LabBenchDemo.Context-menu.prototype */ {

  layout: {width: 150, height: 150, left:400, top: 200},
	backgroundColor: 'yellow',

});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');