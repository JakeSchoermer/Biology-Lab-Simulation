/* >>>>>>>>>> BEGIN bundle_info.js */
        ;(function() {
          var target_name = 'sproutcore/standard_theme' ;
          if (!SC.BUNDLE_INFO) throw "SC.BUNDLE_INFO is not defined!" ;
          if (SC.BUNDLE_INFO[target_name]) return ; 

          SC.BUNDLE_INFO[target_name] = {
            requires: ['sproutcore/empty_theme'],
            styles:   ['/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet-packed.css','/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/stylesheet.css'],
            scripts:  ['/static/sproutcore/standard_theme/es/8b65428a7dcfa2226586b487bde1bf11560de2aa/javascript-packed.js']
          }
        })();

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   LabBenchDemo
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
LabBenchDemo = SC.Application.create(
  /** @scope LabBenchDemo.prototype */ {

  NAMESPACE: 'LabBenchDemo',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN source/controllers/bg_panning.js */
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

/* >>>>>>>>>> BEGIN source/controllers/context_panel_controller.js */
// ==========================================================================
// Project:   LabBenchDemo.contextPanel
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

LabBenchDemo.contextPanelController = SC.ObjectController.create(
/** @scope LabBenchDemo.contextPanel.prototype */ {
	
	recordID: null,
	
	create: function(recordID) {
		//LabBenchDemo.mainPage.mainPane.AppCanvas.WidgetContainer.appendChild(LabBenchDemo.contextPanel);
		LabBenchDemo.contextPanel.append();

		return YES;
	},
	
	destroy: function() {
		LabBenchDemo.contextPanel.remove();
		return YES;
	},
	
	getArticleTitle: function (recordID) {
		return LabBenchDemo.store.find(LabBenchDemo.Articles, recordID).get('ArticleTitle');
	},
	
	getArticleText: function (recordID) {
		return LabBenchDemo.store.find(LabBenchDemo.Articles, recordID).get('ArticleText');
	},
	
}) ;

/* >>>>>>>>>> BEGIN source/controllers/creat.js */
// ==========================================================================
// Project:   LabBenchDemo.creatController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
//sc_require('core');

//var bluePipp = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "5");
LabBenchDemo.creatController = SC.Object.create(
/** @scope LabBenchDemo.creatController.prototype */ {
 //  view: null,
  // TODO: Add your own code here.
    _cardPool:[],
    

		createyellowPipp: function(){
		var card;
		var idx;


		card = LabBenchDemo.PippView.create({
			init:function(){
				arguments.callee.base.apply(this,arguments);
				this.frontView.set('widgetPicture','/static/lab_bench_demo/es/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/yelpipclose.png');
			}
		});
		
	  card.set('layerNeedsUpdate', true);
	  LabBenchDemo.getPath('mainPage.mainPane').appendChild(card);
	  this._cardPool.push(card);
	
		},
    
		destory: function(){
		console.log("destroy");
		this.destroy();
		},
		
    createbluePipp: function(){
		var card;
		var idx;

		card = LabBenchDemo.PippView.create({
					init:function(){
						arguments.callee.base.apply(this,arguments);
						this.frontView.set('widgetPicture','/static/lab_bench_demo/es/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/pipBlueNum.png');
					}
		});

		
	  card.set('layerNeedsUpdate', true);
	  LabBenchDemo.getPath('mainPage.mainPane').appendChild(card);
	  this._cardPool.push(card);
},
	createTtube: function(){
		//var pool = this._cardPool, card;
		var card;
		var idx;

      
		card = LabBenchDemo.TestView.create();
         
		 var classArray = card.get('classNames');
	   console.log(classArray.join(','));
	    if ((idx = classArray.indexOf('flipped')) != -1) {
	    	classArray.splice(idx, 1);
	    }
			card.set('classNames', classArray);
	    card.set('layerNeedsUpdate', true);
	    LabBenchDemo.getPath('mainPage.mainPane').appendChild(card);
	    this._cardPool.push(card);

	  },
	destroyTtube: function(){
			var card;
	    while(this._cardPool.length>0){
			card=this._cardPool.pop();
			card.destroy();
			console.log("destroy");
			
	}
},
		
	changeView: function(){
		this._cardPool[0].destroy();
		
	}	
	
		

	
/*	returnToPool: function(card){
		this._cardPool.push(card);
	}*/

}) ;

/* >>>>>>>>>> BEGIN source/controllers/solution_selectors.js */
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

/* >>>>>>>>>> BEGIN source/controllers/tasks.js */
// ==========================================================================
// Project:   LabBenchDemo.tasksController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
LabBenchDemo.tasksController = SC.ArrayController.create(
/** @scope LabBenchDemo.tasksController.prototype */ {

  // TODO: Add your own code here.

}) ;

/* >>>>>>>>>> BEGIN source/models/articles.js */
// ==========================================================================
// Project:   LabBenchDemo.Articles
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document your Articles here)

  @extends SC.Record
  @version 0.1
*/
LabBenchDemo.Articles = SC.Record.extend(
/** @scope LabBenchDemo.Articles.prototype */ {

	guid: SC.Record.attr(Number),
	ArticleTitle: SC.Record.attr(String),
	ArticleText: SC.Record.attr(String)
	
}) ;

/* >>>>>>>>>> BEGIN source/models/bg_panning.js */
// ==========================================================================
// Project:   LabBenchDemo.BgPanning
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
LabBenchDemo.BgPanning = SC.Record.extend(
/** @scope LabBenchDemo.BgPanning.prototype */ {

  // TODO: Add your own code here.

});
/* >>>>>>>>>> BEGIN source/models/widget_types.js */
// ==========================================================================
// Project:   LabBenchDemo.BgPanning
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
LabBenchDemo.WidgetTypes = SC.Record.extend(
/** @scope LabBenchDemo.BgPanning.prototype */ {

  // TODO: Add your own code here.

});
/* >>>>>>>>>> BEGIN source/views/context_panel.js */
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
/** @scope LabBenchDemo.contextPanel.prototype */ {
	
	layout: {width: 400, height: 300, centerX: 0, centerY: 0},
	
	/*Since PanelPane, no need to explicitly declare childViews*/
	
	contentView: SC.View.design ({
		layout: {top: 0, bottom: 0, left: 0, right: 0 },
		backgroundColor:'white',
		
		childViews: 'ScrollView ArticleTitle CloseBtn'.w(),
		
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
			}.property(),
			
		}), //End Article Title
		 
		CloseBtn: SC.ButtonView.design ({
			layout: {top: 2, right: 2, width: 50, height: 50},
			title: 'X',
			controlSize: SC.SMALL_CONTROL_SIZE,
			
			target: 'LabBenchDemo.contextPanelController',
			action: 'destroy',
		}), //End CloseBtn
		
		ScrollView: SC.ScrollView.design ({
			layout: { top: 50, bottom: 0, left: 5, right: 5 }, 
			borderStyle: SC.BORDER_NONE, 
			hasHorizontalScroller: NO, //Does not need to be explictly added, but probably a good idea.
			
			contentView: SC.TextFieldView.design ({
				layout: {top:0, left:0, bottom:0, right:0 },
				isTextArea: YES, //Makes TextFieldView Multi-Line
				isEnabled: NO, //Makes Text not-selectable
				value: function() {
					var recordID = LabBenchDemo.contextPanelController.get('recordID');

					if (!recordID) {
						recordID = 1;
					}

					return LabBenchDemo.contextPanelController.getArticleText(recordID);
				}.property(),
			}) //End contentView
		}) //End ScrollView
	}) //End ContentView
}); //End contextPanel

/* >>>>>>>>>> BEGIN source/views/my_drag.js */
// ==========================================================================
// Project:   LabBenchDemo.MyDragView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
LabBenchDemo.MyDragView = SC.View.extend(
/** @scope LabBenchDemo.MyDragView.prototype */ {

  touchStart: function(touch) {
    var f = this.get("frame");
    this._touch = {
      start: { x: touch.pageX, y: touch.pageY },
      ourStart: { x: f.x, y: f.y, width: f.width, height: f.height }
    };
    return YES; // or we won't get touchesDragged
  },

  touchesDragged: function(evt, touches) {
    var t = this._touch;
    var f = this.get("frame");
    var parentf = this.get('parentView').get("frame");
    var locleft, loctop;

    // handle X direction
    locleft = t.ourStart.x + evt.pageX - t.start.x;
    if (locleft < 0) {
      locleft = 0;
    }
    else if (locleft >= (parentf.width - f.width)) {
      locleft = (parentf.width - f.width);
    }
    // handle Y direction
    loctop = t.ourStart.y + evt.pageY - t.start.y;
    if (loctop < 0) {
      loctop = 0;
    }
    else if (loctop >= (parentf.height - f.height)) {
      loctop = (parentf.height - f.height);
    }

    this.set("layout", { 
      left: locleft,
      top: loctop,
      width: t.ourStart.width,
      height: t.ourStart.height
    });
  },

  touchEnd: function () {
    // actually, we don't need to do anything here...
  },
  extend: function(){
	arguments.callee.base.apply(this,arguments);
	
},

  // and now, redirect mouse events :)
  mouseDown: function(evt) {
    this.touchStart(evt);
  },

  mouseDragged: function(evt) {
    this.touchesDragged(evt);
  },

  mouseUp: function(evt) {
    this.touchEnd(evt);
  }

});

/* >>>>>>>>>> BEGIN source/views/widget.js */
// ==========================================================================
// Project:   LabBenchDemo.WidgetView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/

sc_require('views/my_drag');
var openTT = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "1");
var closedTT = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "2");
var pipette = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "4");
var testtube = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "3");
var ttubefill = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "5");
	
	
LabBenchDemo.WidgetView = LabBenchDemo.MyDragView.extend({
	layout: {centerX:0,centerY:0,width:252, height:400},			 
	//layout: { left:  0, top: 0, width: 200, height: 250 },
	//widgetPicture: openTT.get('picture'),
	//fillLevel: 0,
	classNames:['widget'],
	
	//topImage: openTT.get('picture'),    
	childViews: 'toolView frontView backView'.w(),
    toolView:SC.View.extend({
		layout:{right:0, top:0, width:50, height:50},
		backgroundColor: 'lightblue',        
		classNames: ['face'],
		isVisible: NO,
		childViews:'mixButton tooltwoButton'.w(),
      mixButton: SC.ButtonView.design({
			layout:{top:0,centerX:0,width:40,height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title:  "MIX",
			action: "mix",
			
			targetBinding: '.parentView.parentView',
			classNames: ['face']
		}),
		tooltwoButton: SC.ButtonView.design({
			layout:{top:20,centerX:0,width:40,height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			action: 'destroy',    
			target: 'LabBenchDemo.creatController',
			title:  "tool2",
			classNames: ['face']
		})	
	}),
	frontView: SC.View.extend({
		layout: { width: openTT.get('x')+20, height: openTT.get('y')+20 },
		backgroundColor: 'blue',        

		widgetPicture: openTT.get('picture'),
		classNames: ['face', 'front'],
		childViews: 'conButton flipButton topImage'.w(),
		
		topImage: SC.ImageView.design({
		layout:{centerX:0, bottom:0, width:openTT.get('x'), length:openTT.get('y')},
		useImageCache: YES,
		contentBinding:'.parentView',
		contentValueKey:'widgetPicture',
		classNames:['image']	
		}),
		conButton: SC.ButtonView.extend({
		      layout: {top: 5, right: 5, width:15,height:15},
		      controlSize: SC.SMALL_CONTROL_SIZE,
			  titleMinWidth: 0,
			  action: "visibleTool",	
		      icon: 'sc-icon-options-16',
			  targetBinding: '.parentView.parentView',
		//      classNames: ['face'],
			  classNames: ['face','conButton']
		    }),
		flipButton: SC.ButtonView.extend({
			layout: { bottom: 5, right: 5, width: 16, height: 16 },
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title:  "i",
			action: "doFlip",
			targetBinding: '.parentView.parentView',
			classNames: ['face']
		})
	}),
 	backView: SC.View.extend({
		layout: { width: 196, height: 196 },
		classNames:['face', 'back'],
		childViews: 'changeButton selectButton doneButton '.w(),
		changeButton: SC.ButtonView.extend({
			layout: { bottom: 5, left: 5, width: 100, height: 16 },
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
		   	title:  "change",
		    action: 'changeView',    
			target: 'LabBenchDemo.creatController',
		    classNames: ['face']
		}),
		selectButton: SC.SelectButtonView.extend({
			layout: { top: 70, centerX: 0, width: 150, height:100 },	
			//Type1 - selectionValue not defined by the user
			title: 'containers',
			objects: [ { title: "testtube", icon: 'select-button-icon'},
			//openTT     { title: "beaker", icon: 'select-button-icon'},
				{ title: "pipette", icon: 'select-button-icon'}],
				//{ title: "pipette", icon: 'select-button-icon', pos: 3 }],
				//{ title: "lemon", icon: 'select-button-icon', pos: 4 }],
			nameKey: 'title',
		    theme: 'square',
		    iconKey: 'icon',
		    value: 'chicolate',
		    valueKey: 'title'
			//checkboxEnabled: YES
		}),
		doneButton: SC.ButtonView.extend({
			layout: { bottom: 5, right: 5, width: 40, height: 16 },
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title:  "Done",
			action: "doFlip",
			targetBinding: '.parentView.parentView',
			classNames: ['face']
		})
	}),
	doFlip: function() {
		var idx;
		var classArray = this.get('classNames');
		console.log(classArray.join(','));
		if ((idx = classArray.indexOf('flipped')) != -1) {
			classArray.splice(idx, 1);
		} else {
			classArray[classArray.length] = 'flipped';
		}
		this.set('classNames', classArray);
		this.set('layerNeedsUpdate', true);
	},
	changePicture: function() {
		var val = this.backView.selectButton.get('value');
		if (val == 'testtube'){
			this.set('widgetPicture',openTT.get('picture'));
			this.frontView.set('layout',{ width: openTT.get('x')+20, height: openTT.get('y')+20 });
			this.frontView.topImage.set('layout', {centerX: 0, top: 5, width: openTT.get('x'), height: openTT.get('y')});
		}
		if (val == 'pipette') { // pippette is so big one, and it's a problem here, making a small image can solve this problem
			this.set('widgetPicture', pipette.get('picture'));
			this.frontView.set('layout',{ width: pipette.get('x')+20, height: pipette.get('y')+20 });
			this.frontView.topImage.set('layout', {centerX: 0, top: 5, width: pipette.get('x'), height: pipette.get('y')});
		}
	},
/*	init: function() {
		arguments.callee.base.apply(this,arguments);
		this.set('layout', {left:10,top:10,width:252, height:250});
		//this.cardView.set('layout',{ left:  0, top: 0, width: 200, height: 250 });
	},*/
	visibleTool: function(){
		console.log("visible");
		var val= this.toolView.get('isVisible');
		var distance = this.frontView.get('layout');
		console.log(distance.width);
		this.toolView.set('layout',	{left:(distance.width+3), top:0, width:50, height:50});
		
     	if(val==YES) {
			this.toolView.set('isVisible',NO);
		}
		if(val==NO) {
			this.toolView.set('isVisible',YES);
		}
	},
	mix: function() {
	      var idx;
	      var classArray = this.get('classNames');

	      this.frontView.set('widgetPicture', closedTT.get('picture'));
		  this.frontView.set('layout',{ width: closedTT.get('x')+20, height: closedTT.get('y')+20 });
		  this.frontView.topImage.set('layout', {centerX: 0, top: 5, width: closedTT.get('x'), height: closedTT.get('y')});

	      console.log(classArray.join(','));
	      if ((idx = classArray.indexOf('mix')) == -1) { 
		    classArray[classArray.length] = 'mix';
		  }
		  this._timer = SC.Timer.schedule({ target: this, action: "unmix", repeats: NO, interval: 1000 });
	      this.set('layerNeedsUpdate', true);
	      this.set('classNames', classArray);
	      this.toolView.set('isVisible',NO);
	  },

	unmix: function() {
	      var idx;
	      var classArray = this.get('classNames');

	      console.log(classArray.join(','));
	      if ((idx = classArray.indexOf('mix')) != -1) {
	      classArray.splice(idx, 1);
	      }
	  this.set('layerNeedsUpdate', true);
	  this.set('classNames', classArray);
	  this.toolView.set('isVisible',NO);

	  //   this.cardView.set('widgetPicture',openTT.get('picture'));
	//    this.cardView.set('background', lightblue);
//		this.frontView.frontView.set('layout',{ width: closedTT.get('x')+20, height: closedTT.get('y')+20 });
//		this.frontView.frontView.topImage.set('layout', {centerX: 0, top: 5, width: closedTT.get('x'), height: closedTT.get('y')});
		}
});

/* >>>>>>>>>> BEGIN source/views/pipp.js */
// ==========================================================================
// Project:   LabBenchDemo.PippView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/widget');

var bluePipp = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "5");
var hundred=0;
var ten=0;
var one=0;
var dem=0;

//var yellowPipp = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "2");
LabBenchDemo.PippView = LabBenchDemo.WidgetView.extend(
/** @scope LabBenchDemo.PippView.prototype */ {

  // TODO: Add your own code here.
	init: function(){
		arguments.callee.base.apply(this,arguments);
		this.frontView.set('widgetPicture',bluePipp.get('picture'));
		this.frontView.set('layout',{left:0, top:0, width:bluePipp.get('x'), height:bluePipp.get('y')});
		this.frontView.topImage.set('layout',{centerX:0, bottom:0, width:bluePipp.get('x'), height:bluePipp.get('y')});
		this.toolView.mixButton.set('isEnabled',NO);
		
      var hundredView= SC.ButtonView.create({
			layout:{top:145,centerX:3, width: 20, height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,

			title: hundred.toString(),
		  //  action: LabBenchDemo.CardView.create(),
			targetBinding: '.parentView'
		});


		var tenView= SC.ButtonView.create({
			layout:{top:160, centerX:3, width: 20, height:15},
	     	controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title: ten.toString(),

			targetBinding: '.parentView'

		});

		var oneView= SC.ButtonView.create({
			layout:{top:175, centerX:3, width: 20, height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title: one.toString(),

			targetBinding: '.parentView'

		});

		var demView= SC.ButtonView.create({
			layout:{top:193, centerX:3, width: 20, height:15},
			controlSize: SC.SMALL_CONTROL_SIZE,
			titleMinWidth: 0,
			title: dem.toString(),

			targetBinding: '.parentView'

		});

		

		var decreButton= SC.View.create({
			layout: {top:50,left:10,width:20,height:20},

			classNames:['number'],
			//titleMinwidth:0,
			backgroundColor: 'white',        


			mouseDown: function(evt){
				this._time = SC.Timer.schedule({ target: this, action: "decrement", repeats: YES, interval: 100 });
			},	
			mouseUp: function(evt) {
				this._time.invalidate();
			},
			decrement: function(){

					var number;
					number= dem+one*10+ten*100+hundred*1000;
					if(number<=0){
						this._time.set('isPaused', YES) ;
					}else{
						number--;
					}

					hundred=parseInt(number/1000, 10);
					ten=parseInt((number-hundred*1000)/100, 10);
					one=parseInt((number-hundred*1000-ten*100)/10, 10);
					dem=parseInt((number-hundred*1000-ten*100-one*10), 10);

				demView.set('title',dem.toString());
				oneView.set('title',one.toString());
				tenView.set('title',ten.toString());
				hundredView.set('title',hundred.toString());
			}
		});


		var increButton= SC.View.create({
			layout: {top:50,right:10,width:20,height:20},

		  classNames:['number'],
			backgroundColor: 'lightblue',        


			mouseDown: function(evt){
				console.log("increse");
				this._timer = SC.Timer.schedule({ target: this, action: "increment", repeats: YES, interval: 100 });
			},	
			mouseUp: function(evt) {
				this._timer.invalidate();
			},
			increment: function(){
				dem=dem+1;
				if(dem==10){
					dem=0;
					one=one+1;
					if(one==10){
						one=0;
						ten++;
						if(ten==10){
							ten=0;
							hundred++;
							if(hundred==10){
								dem=9;
								one=9;
								hundred=9;
								ten=9;
								this._timer.set('isPaused', YES) ;
							}
						}
					}
				}
				demView.set('title',dem.toString());
				oneView.set('title',one.toString());
				tenView.set('title',ten.toString());
				hundredView.set('title',hundred.toString());
			}
		});

		this.frontView.appendChild(demView);
			this.frontView.appendChild(oneView);
				this.frontView.appendChild(tenView);
					this.frontView.appendChild(hundredView);
						this.frontView.appendChild(decreButton);
							this.frontView.appendChild(increButton);
		}

});

/* >>>>>>>>>> BEGIN source/views/test.js */
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

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
// ==========================================================================
// Project:   LabBenchDemo - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

var widget_width = (document.height-20)*3658/1481; // BAD ... NEVER use global objects!!
var widget_height = document.height-36;

// Functions
// This page describes the main user interface for your application.  
var hundred=0;
var ten=0;
var one=0;
var dem=0;
var flag=0;
var testtube = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "1");
var beaker = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "2");
var pipette = LabBenchDemo.store.find(LabBenchDemo.WidgetTypes, "3");

// This page describes the main user interface for your application.  
LabBenchDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.

  mainPane: SC.MainPane.design({	
		childViews: 'AppCanvas yellowpippView bluepippView ttubebtnView reloadView'.w(),
		
		    AppCanvas: SC.View.design({
		    	childViews: 'WidgetContainer AppToolbar'.w(),
				layout: { top: 10, left: 10, right: 10, bottom: 10 },
		      	backgroundColor:'white',
				
				WidgetContainer: SC.View.design ({
						
						childViews: 'LabImgView SafetyDisposalSelector PippetContainerSelector BubbleBathSolutionSelector LabJackSelector MuscleTissueSelector GasLineSelector'.w(),
						layout: {width: widget_width, height: widget_height, top: 36, centerX:0}, // centerX: -10 will offset 10px to the left from center
						
						originalwidthBinding: 'LabBenchDemo.bgPanning.originalwidth',
						originalheightBinding: 'LabBenchDemo.bgPanning.originalheight',
						zoomPosBinding: 'LabBenchDemo.bgPanning.zoomPos',
							
						LabImgView: SC.ImageView.design ({
				   		layout: {width: widget_width, height: widget_height},
							
							value: '/static/lab_bench_demo/es/e133d8bf1d3bcfc7bbfc842e402b5286178256cc/resources/images/laboratory.svg',
							useImageCache: YES, //Allows image to load in the background
							
							//Mouse Events
							mouseDown: LabBenchDemo.bgPanning.mouseDown,
							mouseDragged: LabBenchDemo.bgPanning.mouseDragged,
							mouseUp: LabBenchDemo.bgPanning.mouseUp,

							//Touch Events
							touchStart: LabBenchDemo.bgPanning.touchStart,
							touchEnd: LabBenchDemo.bgPanning.touchEnd,
							touchDragged: LabBenchDemo.bgPanningEnd,

							}), //End of LabImgView
							
						
								
								
								//---------------- Selectors -------------------------------------
								
								SafetyDisposalSelector: SC.View.design ({

									layout: {width: 130, height: 135, left: 33, top: 315},
									classNames: 'ContextPanelSelector-unselected-border',
									
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										
										LabBenchDemo.contextPanelController.set('recordID' , 1);
										
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of SafetyDisposalSelector
								
								PippetContainerSelector: SC.View.design ({

									layout: {width: 150, height: 60, left: 145, top: 510},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									
									
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 2);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of PippetContainerSelector
								
								BubbleBathSolutionSelector: SC.View.design ({

									layout: {width: 90, height: 120, left: 1005, top: 20},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 3);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of BubbleSolutionSelector	
								
								LabJackSelector: SC.View.design ({

									layout: {width: 220, height: 200, left: 650, top: 265},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 4);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of LabJackSelector
								
								MuscleTissueSelector: SC.View.design ({

									layout: {width: 90, height: 250, left: 1035, top: 230},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 5);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of MuscleTissueSelector
								
								GasLineSelector: SC.View.design ({

									layout: {width: 120, height: 160, left: 1350, top: 360},
									
									classNames: 'ContextPanelSelector-unselected-border',
									//Mouse Events
									
									mouseEntered: LabBenchDemo.solutionSelectors.mouseEntered,
									mouseExited: LabBenchDemo.solutionSelectors.mouseExited,
									mouseDown: function () {
										LabBenchDemo.contextPanelController.set('recordID' , 6);
										//alert('recordID: ' + LabBenchDemo.contextPanelController.get('recordID'));
										LabBenchDemo.contextPanelController.create();
										return YES;
									},
									
								}), //End of GasLineSelector
								
								
								//--------------------- End of Selectors -----------------------
																
					}), //End of WidgetContainer
										
		
					AppToolbar: SC.ToolbarView.design ({
						
						childViews: 'AppTitleLabel ZoomOutBtn ZoomInBtn'.w(),
						
						layout: {top:0, left:0, right:0, height:36},
						anchorLocation: SC.ANCHOR_TOP,
						classNames: 'AppToolbar', //CSS Class
						
						AppTitleLabel: SC.LabelView.design ({
							layout: {height:26, width:200, top:5, left: 10},
							fontSize: SC.LARGE_SIZE,
							tagName:"h1",
							classNames:['AppTitleLabel'],
							value: "Biology Lab Simulation"
						}),
						
						ZoomOutBtn: SC.ButtonView.design ({
							layout: {height:32, width:32, top:2, bottom:2, right: 46},
							controlSize: SC.SMALL_CONTROL_SIZE,
							fontWeight: SC.BOLD_WEIGHT,
							classNames: "AppToolbarButtons",
							title: '<p>-</p>',
							target: "LabBenchDemo.bgPanning",
							action: "Zoom",
							direction: "in"
						}), //End of ZoomOutBtn
						
						ZoomInBtn: SC.ButtonView.design ({
							layout: {height:32, width:32, top:2, bottom:2, right: 10},
							controlSize: SC.SMALL_CONTROL_SIZE,
							classNames: "AppToolbarButtons",
							title: '<p>+</p>',
							target: "LabBenchDemo.bgPanning",
							action: "Zoom",
							 
							direction: "out"					
						}) //End of ZoomInBtn
					}) //End of AppToolbar
		    	}), //End of AppCanvas View
			
			//Yellow Pippet
			yellowpippView: SC.ButtonView.design({
			layout: { left: 5, top: 241, width: 100, height: 100 },      
			title: " ",      
			action: 'createyellowPipp',    
			target: 'LabBenchDemo.creatController',


			classNames: ['yellowpipbtn toolbar']
			}),
				
				//Blue Pippet
		    bluepippView: SC.ButtonView.design({
			  layout: { left: 5, top: 141, width: 100, height: 100 },      
			  title: " ",      
			  action: 'createbluePipp',    
			  target: 'LabBenchDemo.creatController',

			  classNames: ['bluepipbtn toolbar']
			}),
				//Test Tube
		    ttubebtnView: SC.ButtonView.design({      
			  layout: { left: 5, top: 41, width: 100, height: 100 },      
			  title: " ",      
			  action: 'createTtube',    
			  target: 'LabBenchDemo.creatController',

			  classNames: ['ttubebtn toolbar']
		  }),
			
			//Button to Refresh Buttons
			reloadView: SC.ButtonView.design({      
			  layout: { left: 5, top: 341, width: 100, height: 100 },      
			  title: " ",      
			  action: 'destroyTtube',    
			  target: 'LabBenchDemo.creatController',


			  classNames: ['reload toolbar']    
		})
  }) //End of MainPane
}); //End LabBenchDemo.mainPage

/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   LabBenchDemo
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
LabBenchDemo.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  LabBenchDemo.getPath('mainPage.mainPane').append() ;

	// Step 2. Set the content property on your primary controller.
	// This will make your app come alive!
	
	
	
  // TODO: Set the content property on your primary controller
  // ex: LabBenchDemo.contactsController.set('content',LabBenchDemo.contacts);

} ;

function main() { LabBenchDemo.main(); }

/* >>>>>>>>>> BEGIN source/views/main.js */
// ==========================================================================
// Project:   LabBenchDemo.MainView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals LabBenchDemo */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
LabBenchDemo.MainView = SC.View.extend(
/** @scope LabBenchDemo.MainView.prototype */ {

  // TODO: Add your own code here.

});

