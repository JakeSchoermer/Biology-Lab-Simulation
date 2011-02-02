// ==========================================================================
// Project:   LabBenchAdmin - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals LabBenchAdmin */

// This page describes the main user interface for your application.  
LabBenchAdmin.mainPage = SC.Page.design({
  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'mainToolbar AppCanvas'.w(),
	
	mainToolbar: SC.ToolbarView.design ({
		
		childViews: 'AppTitleLabel'.w(),
		
		layout: {top:10, left:10, right:10, height:36, bottom:0},
		anchorLocation: SC.ANCHOR_TOP,
		autoresizeBehavior: SC.RESIZE_TOP_LEFT,
		defaultThickness: 0.8,
			
		AppTitleLabel: SC.LabelView.design ({
			layout: {height:36, width:300, top:5, left: 10},
			fontSize: SC.LARGE_SIZE,
			tagName:"h1",				
			value: "Admin Tool - Biology Lab Simulation"
		})
	}),
	
	AppCanvas: SC.TabView.design({
		layout: {top:25, left:10, right:10, bottom: 10},
		nowShowing: 'LabBenchAdmin.canvasPanels.dbView',
		itemTitleKey: 'title',
		itemValueKey: 'value',
		
		items: [
			{title: 'Database View', value:'LabBenchAdmin.canvasPanels.dbView'},
		]
		
	}) //End of AppCanvas
    
    

    })//End of mainPane
}); //End of LabBenchAdmin.mainPage
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_admin');