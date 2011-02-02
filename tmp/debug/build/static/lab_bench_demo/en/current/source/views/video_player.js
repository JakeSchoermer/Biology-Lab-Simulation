// ==========================================================================
// Project:   LabBenchDemo.VideoPlayerView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/

LabBenchDemo.VideoPlayerView = SC.PanelPane.extend(
/** @scope LabBenchDemo.VideoPlayerView.prototype */ {

	layout: {width: 800, height: 600, centerX: 0, centerY: 0},
	
	contentView: SC.View.design ({
		layout: {top: 0, bottom: 0, left: 0, right: 0 },
		backgroundColor:'white',
	
		childViews: 'CloseBtn videoContent'.w(),
		
		CloseBtn: SC.ButtonView.design ({
			layout: {top: 2, right: 2, width: 50, height: 50},
			title: 'X',
			controlSize: SC.SMALL_CONTROL_SIZE,
			
			//target: 'LabBenchDemo.contextPanelController',
			action: function() {this.parentView.parentView.remove();}
		}), //End CloseBtn
		
		videoContent: SC.LabelView.design ({
			
			layout: {top: 10, bottom: 10, left: 0, right: 0},	
			escapeHTML: NO,
			classNames: 'Video Player',
			
			
			value: function() {
				var recordID = LabBenchDemo.contextPanelController.get('recordID');
				
				if (!recordID) {
					recordID = 1;
				}
				
				return LabBenchDemo.videoPlayerController.getArticleVideo(recordID);
			}.property()
			
		}) //End videoContent
	}) //End contentView
});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('lab_bench_demo');