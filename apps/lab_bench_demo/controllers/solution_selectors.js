// ==========================================================================
// Project:   LabBenchDemo.solutionSelectors
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
LabBenchDemo.solutionSelectors = SC.ObjectController.create(
/** @scope LabBenchDemo.solutionSelectors.prototype */ {
	
  	mouseEntered: function() {
		
		this.set('classNames', ["sc-view", "ContextPanelSelector-selected-border"]);
		this.displayDidChange(); //Redraws View*
		
	}, //End Mouse Entered
	
	mouseExited: function () {
		
		this.set('classNames', ["sc-view", "ContextPanelSelector-unselected-border"]);
		this.displayDidChange(); //Redraws View*
		
	}, //End Mouse Exited

}) ;
