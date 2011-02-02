// ==========================================================================
// Project:   LabBenchDemo.TestView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/widget');


var openTT = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "1");
var closedTT = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "2");		

LabBenchDemo.TestView = LabBenchDemo.WidgetView.extend({
	init:function(){
		arguments.callee.base.apply(this,arguments);
		this.frontView.set('widgetPicture',openTT.get('picture'));
		this.frontView.topImage.set('layout',{centerX:0, bottom:0, width:openTT.get('x'), heigth:openTT.get('y')});
	}

});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');