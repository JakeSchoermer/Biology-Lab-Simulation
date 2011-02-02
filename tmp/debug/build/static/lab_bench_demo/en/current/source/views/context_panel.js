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

LabBenchDemo.contextPanel = SC.PanelPane.extend(
/** @scope LabBenchDemo.contextPanel.prototype */ {
	
	layout: {width: 640, height: 480, centerX: 0, centerY: 0},
	
	/*Since PanelPane, no need to explicitly declare childViews*/
	
	contentView: SC.View.design ({
		layout: {top: 0, bottom: 0, left: 0, right: 0 },
		backgroundColor:'white',
		
		childViews: 'ScrollView ArticleTitle CloseBtn VideoBtn'.w(),
		
		ArticleTitle: SC.LabelView.design ({
			layout: { top: 0, bottom: 0, left: 7, right: 0, height:22, width:350 }, 
			tagName:"h1",
			classNames:['ArticleTitle'],
			
			value: function() {
				var recordID = LabBenchDemo.contextPanelController.get('recordID');
				
				if (!recordID) {
					recordID = 1;
				}
				
				return LabBenchDemo.contextPanelController.getArticleTitle(recordID);
			}.property()
			
		}), //End Article Title
		 
		CloseBtn: SC.ButtonView.design ({
			layout: {top: 2, right: 2, width: 50, height: 50},
			title: 'X',
			controlSize: SC.SMALL_CONTROL_SIZE,
			
			//target: 'LabBenchDemo.contextPanelController',
			action: function() {this.parentView.parentView.remove();}
		}), //End CloseBtn
		
		VideoBtn: SC.ButtonView.design ({
			layout: {top: 44, left: 0, width: 60, height: 60},
			title: "<img src='static/lab_bench_demo/en/current/resources/icons/Monitor.png' alt='Video' height='50px' width='50px'/>",
			controlSize: SC.SMALL_CONTROL_SIZE,
			
			action: function () {
				this.parentView.parentView.remove();
				LabBenchDemo.VideoPlayerView.create().append();
			}
		}),
		
		ScrollView: SC.ScrollView.design ({
			layout: { top: 100, bottom: 0, left: 5, right: 5 }, 
			borderStyle: SC.BORDER_NONE, 
			hasHorizontalScroller: NO, //Does not need to be explictly added, but probably a good idea.
			
			contentView: SC.TextFieldView.design ({
				layout: {top:0, left:0, bottom:0, right:0 },
				isTextArea: YES, //Makes TextFieldView Multi-Line
				isEnabled: NO, //Makes Text not-selectable
				escapeHTML: NO,
				
				value: function() {
					var recordID = LabBenchDemo.contextPanelController.get('recordID');

					if (!recordID) {
						recordID = 1;
					}

					return LabBenchDemo.contextPanelController.getArticleText(recordID);
				}.property()
			}) //End contentView
		}) //End ScrollView
	}) //End ContentView
}); //End contextPanel
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');