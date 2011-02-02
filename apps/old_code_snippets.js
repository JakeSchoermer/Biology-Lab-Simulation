//Mouse Events
mouseDown: function(evt) {
    var layout = this.get('layout');
    this._mouseDownInfo = {
      pageX: evt.pageX, // save mouse pointer loc for later use
      pageY: evt.pageY				
    };
    return YES; // so we get other events
 }, //End mouseDown

mouseUp: function(evt) {	
		
		var layout_after = this.get('layout');
		this._mouseUpInfo = {
      pageX: evt.pageX, // save mouse pointer loc for later use
      pageY: evt.pageY					
    };
	
		var startinfo = this._mouseDownInfo, startlocx;
		var startlocx = startinfo.pageX;
		
		var finishinfo = this._mouseUpInfo, finishlocx;
		var finishlocx = finishinfo.pageX; 
		
		var swipelen = LabBenchDemo.mainPage.mainPane.AppCanvas.LabImgView.get('layout').width/3;			
		
		//alert(startlocx);
		//alert(finishlocx);
		
		var left = LabBenchDemo.mainPage.mainPane.AppCanvas.LabImgView.get('layout').left;
		var graphLeft = LabBenchDemo.mainPage.mainPane.AppCanvas.GraphView.get('layout').left;
																													
		if ((startlocx - finishlocx) > 100) {
			this.adjust('left', left-swipelen);																											
			LabBenchDemo.mainPage.mainPane.AppCanvas.GraphView.adjust('left', graphLeft-swipelen);
		}
		
		else if ((finishlocx - startlocx) > 100) {
			this.adjust('left', left+swipelen);
			LabBenchDemo.mainPage.mainPane.AppCanvas.GraphView.adjust('left', graphLeft+swipelen);
		}						
	}, //End mouseUp