// ==========================================================================
// Project:   LabBenchDemo.bgPanning
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */
var zoomFactorArray =  [0.10, 0.25, 0.50, 0.75, 1, 1.25, 1.33, 1.50, 1.75, 2];

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

LabBenchDemo.bgPanning = SC.ObjectController.create(
/** @scope LabBenchDemo.bgPanning.prototype */ {
		
		zoomPos: 4,
		
		_originalwidth: null,
		originalwidth: function() {
			var w = this._originalwidth;
			if (!w) w = (document.height-20)*3658/1481;
			return w;
		}.property(),
		
		_originalheight: null,
		originalheight: function() {
			var h = this._originalheight;
			if (!h) h = document.height-36;
			return h;
		}.property(),
			
		Zoom: function(input, evt) {
			
		var direction = input.get('direction'),
			zoomPos = this.get('zoomPos'),
		
			//Get original dimensions of View
			originalwidth = this.get('originalwidth'),
			originalheight = this.get('originalheight');

		
			//-------------------------- Button Inputs ---------------------------//
			
			//Zoom Out
			
			if (direction === "out" /*-*/) {
				if (zoomPos >= 0 & zoomPos < zoomFactorArray.length-1) {
					zoomPos++;
				}
				else {
					alert('Cannot Zoom In Any Further!');
				}
			}
			
			//Zoom In
			else if (direction === "in" /*+*/ ) {
				if (zoomPos > 0 & zoomPos < zoomFactorArray.length) {
					zoomPos --;
				}
				else {
					alert('Cannot Zoom Out Further!');
				}
			}
		
			//Error Handling
			else {
				alert("Zoom got called, but I don't know what button you pressed?");
			}
		
			//------------------------- Set Variables of objects-------------------------------//
		
			//Re-write zoomPos to View		
			LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.set('zoomPos', zoomPos);
			
			var newWidth = originalwidth*zoomFactorArray[zoomPos];
			var newHeight = originalheight*zoomFactorArray[zoomPos];

			//Centre WidgetContainer if Smaller than Canvas
			LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.set('layout', {width: newWidth, height:newHeight, left: (document.width-20-newWidth)/2, top: (originalheight - newHeight+ 36*2)/2});
			LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.LabImgView.set('layout', {width: newWidth, height:newHeight, left:0, top:0});
			//Handle GraphView
			LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.GraphView.set('layout', {width: newWidth*0.158, height: newHeight*0.236, left: newWidth*0.2475, top: newHeight*0.3825});
			LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.GraphView.jsxGraph1.set('layout', {width: newWidth*0.158, height: newHeight*0.236, left: 0, top: 0});
			

		}, //End of Zoom
		
		
		mouseDown: function(evt) {
											
		    // indicate dragging - re-renders view
		    this.set('isDragging', YES);
				
			var layout = this.get('layout');
		    this._mouseDownInfo = {
		      pageX: evt.pageX, // save mouse pointer loc for later use
		      pageY: evt.pageY,
		      left:  layout.left, // save layout info 
		      top: layout.top
		    };
		    return YES; // so we get other events
		},
		
		
		mouseDragged: function(evt) {
	    var info = this._mouseDownInfo,
	        loc;
		    // handle X direction
		    loc = info.left + (evt.pageX - info.pageX);		
				
				if (this.parentView.get('layout').left > -this.parentView.get('layout').width &
				this.parentView.get('layout').left < document.width + this.parentView.get('layout').width) {
			
					this.parentView.adjust('left', loc);
							
				}
				
		    // handle Y direction
		    /*loc = info.top + (evt.pageY - info.pageY) ;
		    this.adjust('top', loc);*/

		    return YES ; // event was handled!
		 },
			
		mouseUp: function(evt) {

	    // no longer dragging - will re-render
	    this.set('isDragging', NO);
	
	    // apply one more time to set final position
		    this.mouseDragged(evt); 
		    this._mouseDownInfo = null; // cleanup info
		    return YES; // handled!
		},
		
		touchStart: function(evt) {
			this.mouseDown(evt);
		}, //End touchStart
		
		touchDragged: function(evt) {
			this.mouseDragged(evt);
		}, //End touchDragged
			
		touchEnd: function(evt) {
			this.mouseUp(evt);
		}, //End touchEnd

}); //End of LabBenchDemo.bgPanning
